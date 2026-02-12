import { db } from "@/lib/db";

type CreateFiscalDocumentInput = {
  tenantId: string;
  customerId: string;
  kind: "NFE" | "NFSE" | "NFCE";
  totalInCents: number;
  cbsRate: number;
  ibsRate: number;
  legacyTaxRate?: number;
  coexistenceYear: number;
  municipalityCode: string;
  serviceCode?: string;
  externalNumber?: string;
};

export async function createFiscalDocument(input: CreateFiscalDocumentInput) {
  return db.fiscalDocument.create({
    data: {
      tenantId: input.tenantId,
      customerId: input.customerId,
      kind: input.kind,
      status: "PENDING",
      totalInCents: input.totalInCents,
      cbsRate: input.cbsRate,
      ibsRate: input.ibsRate,
      legacyTaxRate: input.legacyTaxRate,
      coexistenceYear: input.coexistenceYear,
      municipalityCode: input.municipalityCode,
      serviceCode: input.serviceCode,
      externalNumber: input.externalNumber
    }
  });
}
