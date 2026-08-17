import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../firebase/firebaseAdmin.js";

const SITE_URL = "https://getlinknest.vercel.app";
const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/login", changefreq: "yearly", priority: "0.3" },
  { path: "/signup", changefreq: "yearly", priority: "0.3" },
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    // Get all the usernames from linknest users at the moment
    const usersSnapshot = await db.collection("users").select("username").get();
    const userUrls = usersSnapshot.docs
      .flatMap((doc) => {
        const username = doc.data().username;

        if (!username) return [];

        return [
          `
        <url>
          <loc>${SITE_URL}/u/${username}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`,
        ];
      })
      .join("");

    const staticUrls = STATIC_ROUTES.map(
      ({ path, changefreq, priority }) => `
        <url>
            <loc>${SITE_URL}${path}</loc>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
        </url>`,
    ).join("");

    // Create sitemap.xml
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${userUrls}</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // Calling the usernames query every hour
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).send(xml);
  } catch (error) {
    return res.status(500).send("Error generating sitemap");
  }
}
