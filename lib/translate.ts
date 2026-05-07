export interface TranslationInput {
  sourceRecordId: string;
  sourceRecordType: "policy" | "news" | "company" | "country";
  sourceText: string;
  audience: "kid" | "researcher";
}

export interface WoobyTranslation {
  sourceRecordId: string;
  sourceRecordType: TranslationInput["sourceRecordType"];
  generatedAt: string;
  modelVersion: string;
  body: string;
}

export async function translateToWoobyVoice(
  input: TranslationInput,
): Promise<WoobyTranslation> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY not set — translation layer is stubbed.",
    );
  }
  void input;
  throw new Error("translateToWoobyVoice: not yet implemented.");
}
