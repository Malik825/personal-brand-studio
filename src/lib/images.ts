/**
 * Optimizes image URLs for faster delivery and lower payload.
 * For images hosted on Sanity.io CDN, appends modern format (WebP/AVIF),
 * dimensions, and compression parameters.
 */
export function getOptimizedImageUrl(
  url: string | undefined,
  width = 800,
  quality = 75
): string {
  if (!url) return "";
  if (!url.includes("cdn.sanity.io/images/")) return url;
  if (url.includes("auto=format")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=max&w=${width}&q=${quality}`;
}

export function getSanitySrcSet(url: string | undefined): string | undefined {
  if (!url || !url.includes("cdn.sanity.io/images/")) return undefined;
  return `${getOptimizedImageUrl(url, 480, 75)} 480w, ${getOptimizedImageUrl(url, 800, 75)} 800w, ${getOptimizedImageUrl(url, 1200, 75)} 1200w`;
}
