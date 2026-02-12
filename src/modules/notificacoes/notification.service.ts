import { db } from "@/lib/db";

type CreateNotificationInput = {
  tenantId: string;
  userId?: string;
  title: string;
  body: string;
  channel: "APP" | "WHATSAPP";
};

export async function createNotification(input: CreateNotificationInput) {
  return db.notification.create({
    data: {
      tenantId: input.tenantId,
      userId: input.userId,
      title: input.title,
      body: input.body,
      channel: input.channel
    }
  });
}

export async function listNotifications(tenantId: string) {
  return db.notification.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    take: 30
  });
}
