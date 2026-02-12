import { env } from "@/lib/env";

type FocusIssueDocumentInput = {
  kind: "NFE" | "NFSE" | "NFCE";
  reference: string;
  payload: Record<string, unknown>;
};

export class FocusNfeClient {
  async issueDocument(input: FocusIssueDocumentInput) {
    const endpoint = input.kind === "NFSE" ? "https://api.focusnfe.com.br/v2/nfse" : "https://api.focusnfe.com.br/v2/nfe";

    const response = await fetch(`${endpoint}/${input.reference}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.FOCUS_NFE_TOKEN}:`).toString("base64")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input.payload)
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`FOCUS_NFE_ISSUE_FAILED: ${body}`);
    }

    return response.json();
  }
}
