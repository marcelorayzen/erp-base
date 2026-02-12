import { env } from "@/lib/env";

type WhatsAppTemplateInput = {
  to: string;
  templateName: string;
  variables: string[];
};

export class WhatsAppBusinessClient {
  async sendTemplate(input: WhatsAppTemplateInput) {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: input.to,
          type: "template",
          template: {
            name: input.templateName,
            language: { code: "pt_BR" },
            components: [
              {
                type: "body",
                parameters: input.variables.map((value) => ({
                  type: "text",
                  text: value
                }))
              }
            ]
          }
        })
      }
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`WHATSAPP_SEND_FAILED: ${body}`);
    }

    return (await response.json()) as {
      messages?: Array<{ id: string }>;
    };
  }
}
