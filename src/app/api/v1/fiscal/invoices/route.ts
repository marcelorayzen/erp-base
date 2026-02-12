import { NextResponse } from "next/server";
import { authorizeRequest } from "@/core/auth/guards";
import { fiscalDocumentSchema } from "@/core/validation/schemas";
import { createFiscalDocument } from "@/modules/fiscal/fiscal.service";
import { FocusNfeClient } from "@/integrations/focus-nfe/client";
import { writeAuditLog } from "@/core/observability/audit-log";

const focusClient = new FocusNfeClient();

export async function POST(request: Request) {
  const authz = await authorizeRequest(request, ["admin"]);
  if (!authz.ok) return authz.response;

  const body = await request.json();
  const parsed = fiscalDocumentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 });
  }

  const reference = `fiscal_${authz.context.tenantId}_${Date.now()}`;

  const providerData = await focusClient.issueDocument({
    kind: parsed.data.kind,
    reference,
    payload: {
      natureza_operacao: "VENDA",
      consumidor_final: true,
      cbs_aliquota: parsed.data.cbsRate,
      ibs_aliquota: parsed.data.ibsRate,
      regime_transicao_ano: parsed.data.coexistenceYear
    }
  });

  const fiscalDocument = await createFiscalDocument({
    tenantId: authz.context.tenantId,
    ...parsed.data,
    externalNumber: reference
  });

  await writeAuditLog({
    tenantId: authz.context.tenantId,
    userId: authz.context.userId,
    action: "ISSUE",
    resource: "FiscalDocument",
    resourceId: fiscalDocument.id,
    metadata: { providerData }
  });

  return NextResponse.json({ data: fiscalDocument }, { status: 201 });
}
