import { NextResponse, type NextRequest } from "next/server";
import type { Role } from "@prisma/client";
import { auth } from "@/core/auth/auth";
import { hasRequiredRole } from "@/core/auth/rbac";
import { resolveTenantFromHeaders } from "@/core/tenant/context";

export type AuthorizedContext = {
  userId: string;
  tenantId: string;
  tenantSlug: string;
  role: Role;
};

export async function authorizeRequest(request: Request | NextRequest, allowedRoles: Role[] = []) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 })
    };
  }

  const tenant = await resolveTenantFromHeaders(request.headers);
  if (!tenant) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "TENANT_NOT_FOUND" }, { status: 404 })
    };
  }

  const membership = session.user.memberships.find((item) => item.tenantId === tenant.tenantId);
  if (!membership) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "TENANT_FORBIDDEN" }, { status: 403 })
    };
  }

  if (!hasRequiredRole(membership.role, allowedRoles)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "ROLE_FORBIDDEN" }, { status: 403 })
    };
  }

  return {
    ok: true as const,
    context: {
      userId: session.user.id,
      tenantId: tenant.tenantId,
      tenantSlug: tenant.tenantSlug,
      role: membership.role
    }
  };
}
