import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeRequest } from "@/core/auth/guards";
import { createCustomer, listCustomers } from "@/modules/cadastros/customer.service";
import { writeAuditLog } from "@/core/observability/audit-log";

const createCustomerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  document: z.string().optional()
});

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await listCustomers(authz.context.tenantId);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = createCustomerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const customer = await createCustomer({
    tenantId: authz.context.tenantId,
    ...parsed.data
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "CREATE",
    resource: "Customer",
    resourceId: customer.id,
    metadata: { name: customer.name }
  });

  return NextResponse.json({ data: customer }, { status: 201 });
}
