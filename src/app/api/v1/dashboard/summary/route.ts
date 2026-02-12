import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { getDashboardSummary } from "@/modules/dashboard/dashboard.service";

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await getDashboardSummary(authz.context.tenantId);
  return NextResponse.json({ data });
}
