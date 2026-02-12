import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type AuditPayload = {
  tenantId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Prisma.InputJsonValue;
};

export async function writeAuditLog(payload: AuditPayload) {
  await db.auditLog.create({
    data: {
      tenantId: payload.tenantId,
      userId: payload.userId,
      action: payload.action,
      resource: payload.resource,
      resourceId: payload.resourceId,
      metadata: payload.metadata ?? {}
    }
  });
}
