import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { z } from "zod";
import { getCompanySettings, updateCompanySettings } from "@/modules/configuracoes/settings.service";

const updateSettingsSchema = z.object({
  businessName: z.string().min(2),
  cnpj: z.string().min(11),
  phone: z.string().optional(),
  city: z.string().optional(),
  fiscalRegime: z.string().optional(),
  onboardingCompleted: z.boolean().optional()
});

export async function GET(request: Request) {
  const authz = await authorizeRequest(request, ["operador"]);
  if (!authz.ok) return authz.response;

  const data = await getCompanySettings(authz.context.tenantId);
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const authz = await authorizeRequest(request, ["admin"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = updateSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = await updateCompanySettings({
    tenantId: authz.context.tenantId,
    ...parsed.data
  });

  return NextResponse.json({ data });
}
