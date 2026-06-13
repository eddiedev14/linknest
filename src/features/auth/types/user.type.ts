// Se usa Utility Types (particularmente Omit) para crear variantes de interfaces
export type User = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerStyle: string;
  password: string;
};

export type UserDoc = Omit<User, "password">;

// Forms
export type UserRegister = Pick<User, "email" | "username" | "password">;
export type UserLogin = Pick<User, "email" | "password">;
