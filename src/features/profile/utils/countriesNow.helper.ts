import { removeDiacritics } from "@/shared/utils/data.helper";

export function normalizeUniqueAndSort(values: string[]): string[] {
  const map = new Map<string, string>();
  values.forEach((value) => {
    const normalized = removeDiacritics(value);
    const key = normalized.toLowerCase();
    if (!map.has(key)) {
      map.set(key, normalized);
    }
  });

  return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
}
