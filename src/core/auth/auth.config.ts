import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authConfig = {
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
          include: {
            memberships: {
              select: {
                tenantId: true,
                role: true
              }
            }
          }
        });

        if (!user) return null;

        // Starter kit: senha em texto simples para acelerar onboarding local.
        // Substituir por hash (argon2/bcrypt) antes de produção.
        if (user.passwordHash !== parsed.data.password) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          memberships: user.memberships,
          defaultTenantId: user.memberships[0]?.tenantId ?? null
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.memberships = (user as { memberships?: Array<{ tenantId: string; role: "owner" | "admin" | "operador" }> }).memberships ?? [];
        token.defaultTenantId =
          (user as { defaultTenantId?: string | null }).defaultTenantId ??
          (token.memberships as Array<{ tenantId: string }>)[0]?.tenantId ??
          null;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = String(token.userId);
      session.user.memberships =
        (token.memberships as Array<{ tenantId: string; role: "owner" | "admin" | "operador" }>) ?? [];
      session.user.defaultTenantId = (token.defaultTenantId as string | null) ?? null;

      return session;
    }
  }
} satisfies NextAuthConfig;
