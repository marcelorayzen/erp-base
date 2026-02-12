import { NextResponse, type NextRequest } from "next/server";

function parseTenantSlugFromHost(host: string | null): string | null {
  if (!host) return null;

  const cleanHost = host.split(":")[0];
  const parts = cleanHost.split(".");

  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}

export function withTenantContext(request: NextRequest) {
  const headers = new Headers(request.headers);
  const tenantIdHeader = headers.get("x-tenant-id");

  if (tenantIdHeader) {
    return NextResponse.next({ request: { headers } });
  }

  const slugFromHost = parseTenantSlugFromHost(request.headers.get("host"));
  const slugFromCookie = request.cookies.get("tenant-slug")?.value;
  const defaultSlug = process.env.DEFAULT_TENANT_SLUG || "demo";

  headers.set("x-tenant-slug", slugFromHost || slugFromCookie || defaultSlug);

  return NextResponse.next({ request: { headers } });
}
