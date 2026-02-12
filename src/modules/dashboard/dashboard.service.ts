import { db } from "@/lib/db";

export async function getDashboardSummary(tenantId: string) {
  const [overdueExpenses, openSales, lowStockRows] = await Promise.all([
    db.financialTransaction.count({
      where: {
        tenantId,
        kind: "expense",
        paidAt: null,
        dueDate: { lt: new Date() }
      }
    }),
    db.salesOrder.count({
      where: {
        tenantId,
        status: { in: ["PENDING", "CONFIRMED"] }
      }
    }),
    db.$queryRaw<Array<{ count: number }>>`
      select count(*)::int as count
      from "StockItem"
      where "tenantId" = ${tenantId}
      and quantity <= "minimumQuantity"
    `
  ]);

  const lowStockItems = lowStockRows[0]?.count ?? 0;
  const redFlags = overdueExpenses + lowStockItems;

  return {
    semaphore: redFlags > 5 ? "red" : redFlags > 0 ? "yellow" : "green",
    overdueExpenses,
    openSales,
    lowStockItems
  };
}
