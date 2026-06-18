import React from 'react';

// Das Logo liegt als statisches Asset unter /public/logo/.
// Farbe (#1E90FF) und Seitenverhältnis (400:160) stecken bereits im SVG,
// die Größe steuert die umgebende CSS-Klasse (z. B. .logoImg).
export const Logo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="/logo/primaflow-logo.svg"
    alt="Prima Flow"
    width={400}
    height={160}
    {...props}
  />
);
