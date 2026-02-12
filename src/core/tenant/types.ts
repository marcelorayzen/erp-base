import type { Role } from "@prisma/client";

export type TenantContext = {
  tenantId: string;
  tenantSlug: string;
  userId: string;
  role: Role;
};
