import { db } from "@/lib/db";

type UpsertStockItemInput = {
  tenantId: string;
  sku: string;
  name: string;
  quantity: number;
  minimumQuantity: number;
  unitCostInCents: number;
};

export async function upsertStockItem(input: UpsertStockItemInput) {
  return db.stockItem.upsert({
    where: {
      tenantId_sku: {
        tenantId: input.tenantId,
        sku: input.sku
      }
    },
    create: {
      tenantId: input.tenantId,
      sku: input.sku,
      name: input.name,
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
      unitCostInCents: input.unitCostInCents
    },
    update: {
      name: input.name,
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
      unitCostInCents: input.unitCostInCents
    }
  });
}

export async function listStockItems(tenantId: string) {
  return db.stockItem.findMany({
    where: { tenantId },
    orderBy: { updatedAt: "desc" },
    take: 100
  });
}
