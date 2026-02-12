import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type CreateTransactionInput = {
  tenantId: string;
  customerId?: string;
  kind: "income" | "expense";
  description: string;
  amountInCents: number;
  dueDate: Date;
  paidAt?: Date;
};

export async function createTransaction(input: CreateTransactionInput) {
  return db.financialTransaction.create({
    data: {
      tenantId: input.tenantId,
      customerId: input.customerId,
      kind: input.kind,
      description: input.description,
      amountInCents: input.amountInCents,
      dueDate: input.dueDate,
      paidAt: input.paidAt
    }
  });
}

export async function listTransactions(tenantId: string, filters: Prisma.FinancialTransactionWhereInput = {}) {
  return db.financialTransaction.findMany({
    where: { tenantId, ...filters },
    orderBy: { createdAt: "desc" },
    take: 100
  });
}
