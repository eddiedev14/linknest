import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserBannerProps } from "@/shared/utils/userBanner.helper";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserDoc } from "@/features/auth/types/user.type";
import type { Link } from "@/features/links/types/link.type";

export const usePublicPage = () => {
  //* States
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserDoc | null>(null);

  const userId = userProfile?.id;
  const { bannerClassname, bannerCSS } = getUserBannerProps(userProfile?.bannerStyle);

  //* React Router
  const { username } = useParams();

  //* Context
  const { findUser } = useAuth();

  //* useCollection (links)
  const {
    results: links,
    isPending: loadingLinks,
    suscribe: suscribeLinks,
  } = useCollection<Link>(`users/${userId}/links`);

  //* Effects
  useEffect(() => {
    if (!username) return;
    const loadUserProfile = async () => {
      const user = await findUser(username);
      setUserProfile(user);
      setUserProfileLoading(false);
    };

    loadUserProfile();
  }, [username, findUser]);

  useEffect(() => {
    if (!userId) return;
    return suscribeLinks([orderBy("position")]);
  }, [userId, suscribeLinks]);

  return {
    username,
    userProfile,
    links,
    loading: userProfileLoading,
    loadingLinks,
    bannerClassname,
    bannerCSS,
  };
};
