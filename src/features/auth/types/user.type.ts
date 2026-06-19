type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';

export type ProfessionalStatus = 'available' | 'open_to_opportunities' | 'currently_employed';

export type Languages = {
  language: string;
  level: LanguageLevel;
};

export type Avatar = {
  url: string;
  fileId: string;
};

export type User = {
  email: string;
  username: string;
  password: string;
  displayName: string;
  bio: string;
  professionalRole: string;
  professionalStatus: ProfessionalStatus | '';
  location: string;
  techStack: string[];
  experienceYears: number | null;
  languages: Languages[];
  avatar: Avatar;
  bannerStyle: string;
};

export type UserDoc = Omit<User, 'password'>;

// Forms
export type UserRegister = Pick<User, 'email' | 'username' | 'password'>;
export type UserLogin = Pick<User, 'email' | 'password'>;
