import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera un sitio estático (HTML/CSS/JS) en lugar de requerir un servidor Node.js
  output: 'export',

  // Como GitHub Pages se sirve en 'usuario.github.io/lambda-ui-components', 
  // Next necesita saber la ruta base para cargar correctamente los JS/CSS/Imágenes
  basePath: process.env.NODE_ENV === 'production' ? '/lambda-ui-components' : '',

  // Desactiva la optimización de imágenes de servidor si usas next/image
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
