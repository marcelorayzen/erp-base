import { test, expect } from "@playwright/test";

test("health endpoint responde ok", async ({ request }) => {
  const response = await request.get("/api/v1/health");

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe("ok");
});
