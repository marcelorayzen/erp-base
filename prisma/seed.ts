import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo" },
    update: { legalName: "Demo Comercio LTDA" },
    create: {
      slug: "demo",
      legalName: "Demo Comercio LTDA"
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "owner@demo.local" },
    update: {
      name: "Owner Demo",
      passwordHash: "123456"
    },
    create: {
      email: "owner@demo.local",
      name: "Owner Demo",
      passwordHash: "123456"
    }
  });

  await prisma.membership.upsert({
    where: {
      tenantId_userId: {
        tenantId: tenant.id,
        userId: user.id
      }
    },
    update: { role: "owner" },
    create: {
      tenantId: tenant.id,
      userId: user.id,
      role: "owner"
    }
  });

  await prisma.companySettings.upsert({
    where: { tenantId: tenant.id },
    update: {
      businessName: "Demo Comercio",
      cnpj: "00000000000191",
      phone: "+5511999999999",
      city: "Sao Paulo",
      fiscalRegime: "Simples Nacional",
      onboardingCompleted: true
    },
    create: {
      tenantId: tenant.id,
      businessName: "Demo Comercio",
      cnpj: "00000000000191",
      phone: "+5511999999999",
      city: "Sao Paulo",
      fiscalRegime: "Simples Nacional",
      onboardingCompleted: true
    }
  });

  console.log({ tenantId: tenant.id, userEmail: user.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
