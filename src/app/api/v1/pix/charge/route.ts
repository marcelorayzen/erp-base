import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { pixChargeSchema } from "@/core/validation/schemas";
import { MercadoPagoClient } from "@/integrations/mercado-pago/client";
import { createPixCharge } from "@/modules/pix/pix.service";
import { writeAuditLog } from "@/core/observability/audit-log";

const mercadoPagoClient = new MercadoPagoClient();

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = pixChargeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const externalReference = `pix_${authz.context.tenantId}_${Date.now()}`;
  const mpCharge = await mercadoPagoClient.createPixCharge({
    amountInCents: parsed.data.amountInCents,
    description: parsed.data.description,
    externalReference
  });

  const charge = await createPixCharge({
    tenantId: authz.context.tenantId,
    customerId: parsed.data.customerId,
    amountInCents: parsed.data.amountInCents,
    description: parsed.data.description,
    externalId: String(mpCharge.id),
    qrCode: mpCharge.point_of_interaction?.transaction_data?.qr_code,
    qrCodeBase64: mpCharge.point_of_interaction?.transaction_data?.qr_code_base64,
    expiresAt: mpCharge.date_of_expiration ? new Date(mpCharge.date_of_expiration) : undefined
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "CREATE",
    resource: "PixCharge",
    resourceId: charge.id,
    metadata: { externalId: charge.externalId }
  });

  return NextResponse.json({ data: charge }, { status: 201 });
}
