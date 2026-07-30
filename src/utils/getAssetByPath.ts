import type { ImageMetadata } from 'astro';

const assetModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}',
  { eager: true },
);

export function getAssetByPath(path: string): ImageMetadata {
  const normalizedPath = path.replace(/^\/+/, '');
  const asset = assetModules[`../assets/${normalizedPath}`];

  if (!asset) {
    throw new Error(`Asset not found: ${path}`);
  }

  return asset.default;
}
