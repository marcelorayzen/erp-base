import type { Role } from "@prisma/client";

const roleRank: Record<Role, number> = {
  operador: 1,
  admin: 2,
  owner: 3
};

export function hasRequiredRole(currentRole: Role, requiredRoles: Role[]) {
  if (requiredRoles.length === 0) return true;

  const highestNeeded = Math.max(...requiredRoles.map((role) => roleRank[role]));
  return roleRank[currentRole] >= highestNeeded;
}
