import { db } from "@/lib/db";

type UpdateSettingsInput = {
  tenantId: string;
  businessName: string;
  cnpj: string;
  phone?: string;
  city?: string;
  fiscalRegime?: string;
  onboardingCompleted?: boolean;
};

export async function updateCompanySettings(input: UpdateSettingsInput) {
  return db.companySettings.upsert({
    where: { tenantId: input.tenantId },
    create: {
      tenantId: input.tenantId,
      businessName: input.businessName,
      cnpj: input.cnpj,
      phone: input.phone,
      city: input.city,
      fiscalRegime: input.fiscalRegime,
      onboardingCompleted: input.onboardingCompleted ?? false
    },
    update: {
      businessName: input.businessName,
      cnpj: input.cnpj,
      phone: input.phone,
      city: input.city,
      fiscalRegime: input.fiscalRegime,
      onboardingCompleted: input.onboardingCompleted
    }
  });
}

export async function getCompanySettings(tenantId: string) {
  return db.companySettings.findUnique({
    where: { tenantId }
  });
}
