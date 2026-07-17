import type { PlatformId } from "./platform.type";

export interface Link {
  id: string; // Firestore ID
  position: number;
  platform: PlatformId;
  label: string;
  url: string;
}

export type LinkFormData = Omit<Link, "id" | "position">;
