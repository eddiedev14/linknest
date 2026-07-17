import * as z from "zod";
import { PLATFORM_IDS } from "../constants/platforms.constant";
import { LINK_PLATFORMS_MAP } from "@/data/links.data";
import { normalizeUrl } from "../utils/links.helper";

const linkFormScheme = z
  .object({
    platform: z.enum(PLATFORM_IDS),
    label: z.string().min(1, "The label for your link is required"),
    url: z.url("Please enter a valid URL"),
  })
  .superRefine((data, ctx) => {
    const { name, baseUrl } = LINK_PLATFORMS_MAP[data.platform];
    const isGenericWebsite = data.platform === "website" || data.platform === "portfolio";
    if (isGenericWebsite) return;

    if (!normalizeUrl(data.url).startsWith(baseUrl)) {
      ctx.addIssue({
        code: "custom",
        path: ["url"],
        message: `Please enter a valid ${name} URL.`,
      });
    }
  });

export { linkFormScheme };
