import type { Timestamp } from "firebase/firestore";
import type { ProfessionalStatus } from "./professionalStatus.type";
import type { Location } from "./location.type";
import type { Languages } from "./languages.type";
import type { Avatar } from "./avatar.type";

export type User = {
  email: string;
  username: string;
  password: string;
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus;
  location: Location;
  techStack: string[];
  languages: Languages[];
  avatar: Avatar;
  bannerStyle: string;
};

export type BaseDoc = {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type UserDoc = Omit<User, "password"> & BaseDoc;

// Forms
export type UserRegister = Pick<User, "email" | "username" | "password">;
export type UserLogin = Pick<User, "email" | "password">;
