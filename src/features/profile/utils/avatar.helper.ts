const validateAvatarImg = (file: File) => {
  const MAX_SIZE = 1024 * 1024; // 1 MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format not allowed");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("The image is larger than 1MB");
  }
};

export { validateAvatarImg };
