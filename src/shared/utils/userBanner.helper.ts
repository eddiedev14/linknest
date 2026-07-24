const getUserBannerProps = (bannerStyle: string = "") => {
  const isCustomColor = bannerStyle.startsWith("#");
  const bannerClassname = isCustomColor ? undefined : bannerStyle;
  const bannerCSS = isCustomColor ? { backgroundColor: bannerStyle } : undefined;

  return {
    bannerClassname,
    bannerCSS,
  };
};

export { getUserBannerProps };
