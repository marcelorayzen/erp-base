import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      memberships: Array<{ tenantId: string; role: "owner" | "admin" | "operador" }>;
      defaultTenantId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    memberships?: Array<{ tenantId: string; role: "owner" | "admin" | "operador" }>;
    defaultTenantId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    defaultTenantId?: string | null;
    memberships?: Array<{ tenantId: string; role: "owner" | "admin" | "operador" }>;
  }
}
