import { z } from "zod";

export const onboardingSchema = z.object({
  businessName: z.string().min(2),
  cnpj: z.string().min(11),
  segmento: z.string().min(2),
  city: z.string().min(2),
  monthlyRevenue: z.number().nonnegative()
});

export const transactionCreateSchema = z.object({
  kind: z.enum(["income", "expense"]),
  description: z.string().min(2),
  amountInCents: z.number().int().positive(),
  dueDate: z.coerce.date(),
  paidAt: z.coerce.date().optional(),
  customerId: z.string().cuid().optional()
});

export const orderCreateSchema = z.object({
  customerId: z.string().cuid(),
  totalInCents: z.number().int().positive(),
  items: z
    .array(
      z.object({
        stockItemId: z.string().cuid(),
        quantity: z.number().positive(),
        unitPriceInCents: z.number().int().positive()
      })
    )
    .min(1)
});

export const pixChargeSchema = z.object({
  customerId: z.string().cuid(),
  amountInCents: z.number().int().positive(),
  description: z.string().min(3)
});

export const fiscalDocumentSchema = z.object({
  kind: z.enum(["NFE", "NFSE", "NFCE"]),
  customerId: z.string().cuid(),
  totalInCents: z.number().int().positive(),
  cbsRate: z.number().min(0).max(1),
  ibsRate: z.number().min(0).max(1),
  legacyTaxRate: z.number().min(0).max(1).optional(),
  coexistenceYear: z.number().int().min(2026).max(2033),
  municipalityCode: z.string().min(2),
  serviceCode: z.string().optional()
});

export const stockItemSchema = z.object({
  sku: z.string().min(2),
  name: z.string().min(2),
  quantity: z.number().nonnegative(),
  minimumQuantity: z.number().nonnegative().default(0),
  unitCostInCents: z.number().int().nonnegative()
});

export const whatsappSendSchema = z.object({
  to: z.string().min(10),
  templateName: z.string().min(2),
  variables: z.array(z.string()).default([])
});
