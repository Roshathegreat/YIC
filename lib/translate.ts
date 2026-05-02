import { LOBSTER_VOICE } from "./lobster-voice";

export interface TranslationInput {
  sourceRecordId: string;
  sourceRecordType: "policy" | "treaty" | "news" | "company" | "beppu";
  sourceText: string;
  countryName: string;
}

export interface LobsterTranslation {
  sourceRecordId: string;
  sourceRecordType: TranslationInput["sourceRecordType"];
  generatedAt: string;
  modelVersion: string;
  body: string;
}

export async function translateToLobsterVoice(
  input: TranslationInput,
): Promise<LobsterTranslation> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY not set — translation layer is stubbed until week 2.",
    );
  }
  void LOBSTER_VOICE;
  void input;
  throw new Error("translateToLobsterVoice: implementation lands week 2.");
}
