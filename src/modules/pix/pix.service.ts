import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type CreatePixChargeInput = {
  tenantId: string;
  customerId: string;
  amountInCents: number;
  description: string;
  externalId: string;
  qrCode?: string;
  qrCodeBase64?: string;
  expiresAt?: Date;
};

export async function createPixCharge(input: CreatePixChargeInput) {
  return db.pixCharge.create({
    data: {
      tenantId: input.tenantId,
      customerId: input.customerId,
      amountInCents: input.amountInCents,
      description: input.description,
      externalId: input.externalId,
      qrCode: input.qrCode,
      qrCodeBase64: input.qrCodeBase64,
      expiresAt: input.expiresAt
    }
  });
}

export async function confirmPixChargePaid(tenantId: string, externalId: string, payload: unknown) {
  return db.$transaction(async (tx) => {
    const charge = await tx.pixCharge.update({
      where: {
        tenantId_externalId: {
          tenantId,
          externalId
        }
      },
      data: {
        status: "PAID",
        paidAt: new Date()
      }
    });

    await tx.pixWebhookEvent.create({
      data: {
        tenantId,
        chargeId: charge.id,
        eventType: "payment.updated",
        payload: payload as Prisma.InputJsonValue
      }
    });

    return charge;
  });
}
