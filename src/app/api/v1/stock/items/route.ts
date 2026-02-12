import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { stockItemSchema } from "@/core/validation/schemas";
import { listStockItems, upsertStockItem } from "@/modules/estoque/stock.service";
import { writeAuditLog } from "@/core/observability/audit-log";

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await listStockItems(authz.context.tenantId);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["admin"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = stockItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const stockItem = await upsertStockItem({
    tenantId: authz.context.tenantId,
    ...parsed.data
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "UPSERT",
    resource: "StockItem",
    resourceId: stockItem.id,
    metadata: { sku: stockItem.sku }
  });

  return NextResponse.json({ data: stockItem }, { status: 201 });
}
