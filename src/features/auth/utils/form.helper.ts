import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../constants/regex.constant";

// Función para validar el email según el EMAIL_REGEX
const isInvalidEmail = (email: string) => {
  return !EMAIL_REGEX.test(email.trim());
};

const isInvalidUsername = (username: string) => {
  return !USERNAME_REGEX.test(username.trim());
};

const isInvalidPassword = (password: string) => {
  return !PASSWORD_REGEX.test(password.trim());
};

export { isInvalidEmail, isInvalidUsername, isInvalidPassword };
