import type { FirestoreDoc } from "@/firebase/types/firestore.types";
import type { PlatformId } from "./platform.type";

export interface Link {
  position: number;
  platform: PlatformId;
  label: string;
  url: string;
  totalClicks: number;
}

export type LinkDoc = FirestoreDoc<Link>;
export type LinkFormData = Omit<Link, "position" | "totalClicks">;
