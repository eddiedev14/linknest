/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBannerProps } from "@/shared/utils/userBanner.helper";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserDoc } from "@/features/auth/types/user.type";

export const usePublicPage = () => {
  //* States
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserDoc | null>(null);
  const { bannerClassname, bannerCSS } = getUserBannerProps(userProfile?.bannerStyle);

  //* React Router
  const { username } = useParams();

  //* Context
  const { findUser } = useAuth();

  //* Effects
  useEffect(() => {
    if (!username) return;
    const loadUserProfile = async () => {
      const user = await findUser(username);
      setUserProfile(user);
      setUserProfileLoading(false);
    };

    loadUserProfile();
  }, [username]);

  return {
    username,
    userProfile,
    userLoading: userProfileLoading,
    bannerClassname,
    bannerCSS,
  };
};
