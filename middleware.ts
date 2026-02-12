import { withTenantContext } from "@/core/tenant/middleware";

export default withTenantContext;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
