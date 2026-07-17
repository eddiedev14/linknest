import type { Timestamp } from "firebase/firestore";
import type { Avatar, BannerStyle, Language, Location, ProfessionalStatus, Tech } from ".";

export type User = {
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
};

export type BaseDoc = {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type UserDoc = Omit<User, "password"> & BaseDoc;

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
