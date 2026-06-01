import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoalOracle AI - World Cup 2026 Predictions",
    short_name: "GoalOracle AI",
    description:
      "AI-Powered FIFA World Cup 2026 Predictions. Get expert match analysis, betting tips, and streaming guides.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#16a34a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
