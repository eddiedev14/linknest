const CLICK_EXPIRATION = 12 * 60 * 60 * 1000; // 12 horas

const canRegisterClick = (id: string): boolean => {
  // If the web browswer hasn't localStorage
  if (!window.localStorage) return true;

  const clicks: Record<string, number> = JSON.parse(localStorage.getItem("clicksIds:v1") ?? "{}");
  const lastClick = clicks[id];

  if (!lastClick) return true;
  return Date.now() - lastClick >= CLICK_EXPIRATION;
};

const saveClickLocally = (id: string) => {
  // If the web browswer hasn't localStorage
  if (!window.localStorage) return;

  const clicks: Record<string, number> = JSON.parse(localStorage.getItem("clicksIds:v1") ?? "{}");
  clicks[id] = Date.now();
  localStorage.setItem("clicksIds:v1", JSON.stringify(clicks));
};

export { canRegisterClick, saveClickLocally };
