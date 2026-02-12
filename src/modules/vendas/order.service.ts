import { db } from "@/lib/db";

type CreateOrderInput = {
  tenantId: string;
  customerId: string;
  totalInCents: number;
  items: Array<{
    stockItemId: string;
    quantity: number;
    unitPriceInCents: number;
  }>;
};

export async function createOrder(input: CreateOrderInput) {
  return db.$transaction(async (tx) => {
    const order = await tx.salesOrder.create({
      data: {
        tenantId: input.tenantId,
        customerId: input.customerId,
        totalInCents: input.totalInCents,
        status: "PENDING",
        items: {
          create: input.items.map((item) => ({
            tenantId: input.tenantId,
            ...item
          }))
        }
      },
      include: { items: true }
    });

    for (const item of input.items) {
      await tx.stockItem.updateMany({
        where: {
          id: item.stockItemId,
          tenantId: input.tenantId
        },
        data: {
          quantity: {
            decrement: item.quantity
          }
        }
      });

      await tx.inventoryMovement.create({
        data: {
          tenantId: input.tenantId,
          stockItemId: item.stockItemId,
          kind: "OUT",
          quantity: item.quantity,
          reason: `Venda ${order.id}`
        }
      });
    }

    return order;
  });
}

export async function listOrders(tenantId: string) {
  return db.salesOrder.findMany({
    where: { tenantId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}
