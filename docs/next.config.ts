import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: 'export',

  // Genera /ruta/index.html en lugar de /ruta.html (Crucial para que GitHub Pages no dé 404 en refrescos)
  trailingSlash: true,

  // Solo aplica el basePath cuando la build corre dentro del CI de GitHub Actions
  basePath: isGithubActions ? '/lambda-ui-components' : '',
  assetPrefix: isGithubActions ? '/lambda-ui-components/' : '',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;