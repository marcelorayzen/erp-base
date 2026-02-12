import { NextResponse } from "next/server";
import { rateLimit } from "@/core/security/rate-limit";
import { env } from "@/lib/env";
import { confirmPixChargePaid } from "@/modules/pix/pix.service";

export async function POST(request: Request) {
  const remoteAddress = request.headers.get("x-forwarded-for") || "unknown";
  const limiter = rateLimit(`pix-webhook:${remoteAddress}`, 60, 60_000);

  if (!limiter.allowed) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const signature = request.headers.get("x-signature");
  if (!signature || signature !== env.MERCADO_PAGO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    action?: string;
    data?: { id?: string };
    tenantId?: string;
  };

  if (!payload?.data?.id || !payload.tenantId) {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  await confirmPixChargePaid(payload.tenantId, payload.data.id, payload);

  return NextResponse.json({ status: "ok" });
}
