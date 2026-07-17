import * as z from "zod";
import { PLATFORM_IDS } from "../constants/platforms.constant";

export const linkFormScheme = z.object({
  platform: z.enum(PLATFORM_IDS),
  label: z.string().min(1, "The label for your link is required"),
  url: z.url("Please enter a valid URL"),
});
