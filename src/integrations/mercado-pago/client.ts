import { env } from "@/lib/env";

type MercadoPagoCreatePixInput = {
  amountInCents: number;
  description: string;
  externalReference: string;
  payerEmail?: string;
};

type MercadoPagoCreatePixResponse = {
  id: string;
  point_of_interaction?: {
    transaction_data?: {
      qr_code?: string;
      qr_code_base64?: string;
    };
  };
  date_of_expiration?: string;
};

export class MercadoPagoClient {
  async createPixCharge(input: MercadoPagoCreatePixInput) {
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transaction_amount: input.amountInCents / 100,
        description: input.description,
        payment_method_id: "pix",
        external_reference: input.externalReference,
        payer: {
          email: input.payerEmail || "comprador@erpsb.local"
        }
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`MERCADO_PAGO_CREATE_PIX_FAILED: ${body}`);
    }

    return (await response.json()) as MercadoPagoCreatePixResponse;
  }
}
