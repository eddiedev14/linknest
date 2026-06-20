const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export { USERNAME_REGEX, PASSWORD_REGEX };
