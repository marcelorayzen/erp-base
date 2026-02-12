import { db } from "@/lib/db";

type CreateCustomerInput = {
  tenantId: string;
  name: string;
  phone?: string;
  email?: string;
  document?: string;
};

export async function createCustomer(input: CreateCustomerInput) {
  return db.customer.create({
    data: {
      tenantId: input.tenantId,
      name: input.name,
      phone: input.phone,
      email: input.email,
      document: input.document
    }
  });
}

export async function listCustomers(tenantId: string) {
  return db.customer.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}
