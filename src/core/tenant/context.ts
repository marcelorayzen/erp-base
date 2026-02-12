import { db } from "@/lib/db";

export type ResolvedTenant = {
  tenantId: string;
  tenantSlug: string;
};

export async function resolveTenantFromHeaders(headers: Headers): Promise<ResolvedTenant | null> {
  const tenantId = headers.get("x-tenant-id");
  const tenantSlug = headers.get("x-tenant-slug");

  if (tenantId) {
    const tenant = await db.tenant.findUnique({
      where: { id: tenantId },
      select: { id: true, slug: true }
    });

    if (!tenant) return null;

    return {
      tenantId: tenant.id,
      tenantSlug: tenant.slug
    };
  }

  if (tenantSlug) {
    const tenant = await db.tenant.findUnique({
      where: { slug: tenantSlug },
      select: { id: true, slug: true }
    });

    if (!tenant) return null;

    return {
      tenantId: tenant.id,
      tenantSlug: tenant.slug
    };
  }

  return null;
}
