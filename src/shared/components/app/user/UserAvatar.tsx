import { Image } from "@imagekit/react";
import AnonymousProfile from "@/assets/anonymous.webp";

interface Props {
  avatarURL?: string;
  username?: string;
}

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

export const UserAvatar = ({ avatarURL, username }: Props) => {
  return (
    <div
      className="size-28 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md"
      role="img"
      aria-label={username ? `${username}'s profile photo` : "Default profile photo"}
    >
      {avatarURL ? (
        <Image
          urlEndpoint={urlEndpoint}
          src={avatarURL}
          transformation={[
            {
              width: 300,
              height: 300,
              crop: "maintain_ratio",
              quality: 80,
              format: "webp",
            },
          ]}
          loading="eager"
          fetchPriority="high"
          alt={`${username}'s profile`}
        />
      ) : (
        <img
          src={AnonymousProfile}
          className="object-cover aspect-square"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="Default profile"
        />
      )}
    </div>
  );
};
