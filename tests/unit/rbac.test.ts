import { describe, expect, it } from "vitest";
import { hasRequiredRole } from "@/core/auth/rbac";

describe("RBAC", () => {
  it("permite owner para requisito admin", () => {
    expect(hasRequiredRole("owner", ["admin"])).toBe(true);
  });

  it("bloqueia operador para requisito admin", () => {
    expect(hasRequiredRole("operador", ["admin"])).toBe(false);
  });
});
