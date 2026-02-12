import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { whatsappSendSchema } from "@/core/validation/schemas";
import { WhatsAppBusinessClient } from "@/integrations/whatsapp-business/client";
import { registerWhatsAppMessage } from "@/modules/whatsapp/whatsapp.service";
import { writeAuditLog } from "@/core/observability/audit-log";

const whatsAppClient = new WhatsAppBusinessClient();

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = whatsappSendSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const providerResponse = await whatsAppClient.sendTemplate(parsed.data);
  const message = await registerWhatsAppMessage({
    tenantId: authz.context.tenantId,
    to: parsed.data.to,
    templateName: parsed.data.templateName,
    status: "SENT",
    providerMessageId: providerResponse.messages?.[0]?.id
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "SEND",
    resource: "WhatsAppMessage",
    resourceId: message.id,
    metadata: { template: parsed.data.templateName }
  });

  return NextResponse.json({ data: message }, { status: 201 });
}
