import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { orderCreateSchema } from "@/core/validation/schemas";
import { createOrder, listOrders } from "@/modules/vendas/order.service";
import { writeAuditLog } from "@/core/observability/audit-log";

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await listOrders(authz.context.tenantId);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = orderCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const order = await createOrder({
    tenantId: authz.context.tenantId,
    ...parsed.data
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "CREATE",
    resource: "SalesOrder",
    resourceId: order.id,
    metadata: { totalInCents: order.totalInCents }
  });

  return NextResponse.json({ data: order }, { status: 201 });
}
