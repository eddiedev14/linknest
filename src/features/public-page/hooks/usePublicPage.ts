import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/firebase/hooks/useCollection";
import { getUserBannerProps } from "@/shared/utils/userBanner.helper";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import type { UserDoc } from "@/features/auth/types/user.type";
import type { Link, LinkDoc } from "@/features/links/types/link.type";

export const usePublicPage = () => {
  const [userProfile, setUserProfile] = useState<UserDoc | null>(null);
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [loadingLinks, setLoadingLinks] = useState(true);

  const userId = userProfile?.id;
  const { bannerClassname, bannerCSS } = getUserBannerProps(userProfile?.bannerStyle);
  const { username } = useParams();
  const { findUser } = useAuth();
  const { getAll: getAllLinks } = useCollection<Link>(`users/${userId}/links`);
  const { registerClick } = useAnalytics(userId);

  //* Computed values
  const metaDescription = userProfile
    ? userProfile.bio?.trim() ||
      `${userProfile.displayName} on LinkNest — ${userProfile.professionalRole}`
    : "";

  const personJSONLD = Object.fromEntries(
    Object.entries({
      "@context": "https://schema.org",
      "@type": "Person",
      name: userProfile?.displayName ?? "",
      alternateName: userProfile?.username ?? "",
      description: userProfile?.bio ?? "",
      jobTitle: userProfile?.professionalRole ?? "",
      image: userProfile?.avatar.url ?? "",
      url: userProfile?.username ? `https://getlinknest.vercel.app/u/${userProfile.username}` : "",
      sameAs: links.map((link) => link.url),
    }).filter(([, value]) => value !== ""), // Filter by only keys with values
  );

  //* Effects
  useEffect(() => {
    if (!username) return;
    let ignore = false;

    const loadUserProfile = async () => {
      const user = await findUser(username);
      if (!ignore) {
        setUserProfile(user);
        setLoadingUserProfile(false);
      }
    };

    loadUserProfile();

    return () => {
      ignore = true;
    };
  }, [username, findUser]);

  useEffect(() => {
    if (!userId) return;
    let ignore = false;

    const loadLinks = async () => {
      const links = await getAllLinks([orderBy("position")]);
      if (!ignore) {
        setLinks(links);
        setLoadingLinks(false);
      }
    };

    loadLinks();
    return () => {
      ignore = true;
    };
  }, [userId, getAllLinks]);

  return {
    username,
    userProfile,
    links,
    loading: loadingUserProfile,
    loadingLinks,
    bannerClassname,
    bannerCSS,
    metaDescription,
    personJSONLD,
    onLinkClick: registerClick,
  };
};
