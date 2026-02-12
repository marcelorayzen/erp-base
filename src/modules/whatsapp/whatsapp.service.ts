import { db } from "@/lib/db";

type RegisterMessageInput = {
  tenantId: string;
  to: string;
  templateName: string;
  providerMessageId?: string;
  status: "QUEUED" | "SENT" | "FAILED";
};

export async function registerWhatsAppMessage(input: RegisterMessageInput) {
  return db.whatsAppMessage.create({
    data: {
      tenantId: input.tenantId,
      to: input.to,
      templateName: input.templateName,
      providerMessageId: input.providerMessageId,
      status: input.status
    }
  });
}
