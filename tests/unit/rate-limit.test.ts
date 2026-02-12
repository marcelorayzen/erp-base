import { describe, expect, it } from "vitest";
import { rateLimit } from "@/core/security/rate-limit";

describe("rateLimit", () => {
  it("bloqueia apos ultrapassar o limite", () => {
    const key = `test-${Date.now()}`;

    rateLimit(key, 1, 1000);
    const secondTry = rateLimit(key, 1, 1000);

    expect(secondTry.allowed).toBe(false);
  });
});
