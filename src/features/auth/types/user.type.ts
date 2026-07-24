import type { FirestoreDoc } from "@/firebase/types/firestore.types";
import type { Avatar, BannerStyle, Language, Location, ProfessionalStatus, Tech } from ".";

export interface User {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus;
  location: Location;
  techStack: Tech[];
  languages: Language[];
  avatar: Avatar;
  bannerStyle: BannerStyle;
}

export type UserDoc = FirestoreDoc<User>;

// Forms
export type UserRegister = {
  email: string;
  username: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
