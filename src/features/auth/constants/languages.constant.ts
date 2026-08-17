import type { Language } from "../types";

export const LANGUAGE_LABELS = {
  ar: "Arabic",
  zh: "Chinese",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  fr: "French",
  de: "German",
  hi: "Hindi",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  pt: "Portuguese",
  ru: "Russian",
  es: "Spanish",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
} as const;

export const LANGUAGE_VALUES = Object.keys(LANGUAGE_LABELS) as Language[];
