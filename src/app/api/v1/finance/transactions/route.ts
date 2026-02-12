import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { transactionCreateSchema } from "@/core/validation/schemas";
import { createTransaction, listTransactions } from "@/modules/financeiro/transaction.service";
import { writeAuditLog } from "@/core/observability/audit-log";

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await listTransactions(authz.context.tenantId);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = transactionCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const transaction = await createTransaction({
    tenantId: authz.context.tenantId,
    ...parsed.data
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "CREATE",
    resource: "FinancialTransaction",
    resourceId: transaction.id,
    metadata: { kind: transaction.kind, amountInCents: transaction.amountInCents }
  });

  return NextResponse.json({ data: transaction }, { status: 201 });
}
