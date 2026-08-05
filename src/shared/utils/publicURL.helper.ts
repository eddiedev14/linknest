const getPublicURL = (username?: string): string => {
  if (!username) return "";

  const baseURL = window.location.origin;
  return `${baseURL}/u/${username}`;
};

export { getPublicURL };
