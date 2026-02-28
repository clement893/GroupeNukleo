/**
 * OptimizedImage - Component for optimized image loading
 * 
 * Features:
 * - WebP format with PNG/JPG fallback
 * - Lazy loading by default (can be disabled for LCP images)
 * - Responsive srcset for different screen sizes
 * - Proper aspect ratio to prevent CLS
 * - Decoding async for better performance
 * - fetchpriority support for critical images
 */

import { useState, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** When true, image fills its container (100% width/height, no aspect-ratio constraint). Use for hero/cover layouts. */
  fill?: boolean;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  srcset?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  // For WebP with fallback
  webpSrc?: string;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  srcset,
  onLoad,
  onError,
  style,
  webpSrc,
  fallbackSrc,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP and fallback sources if not provided
  const sources = useMemo(() => {
    // Only use WebP if explicitly provided via webpSrc prop
    // Never auto-generate WebP paths as the files may not exist
    // Only use WebP if src already ends with .webp (file is already WebP)
    const fallback = fallbackSrc || src;
    
    // Only use WebP if explicitly provided via prop OR if src is already .webp
    // Never auto-generate .webp from .jpg/.png
    const webp = webpSrc ? webpSrc : (src.endsWith('.webp') ? src : null);
    
    // Only use webp if it's different from fallback (to avoid duplicate sources)
    const finalWebp = (webp && webp !== fallback) ? webp : null;
    
    return { webp: finalWebp, fallback };
  }, [src, webpSrc, fallbackSrc]);

  // Generate responsive srcset if not provided
  // Enhanced with width-based srcset for better performance
  // Uses actual width descriptors for better browser optimization
  const responsiveSrcset = useMemo(() => {
    if (srcset) return { webpSrcset: srcset, fallbackSrcset: srcset };
    
    // Generate responsive srcset based on width
    if (width && !src.includes('.svg')) {
      // Generate multiple sizes for responsive images with width descriptors
      // Mobile: base width, Tablet: 1.5x, Desktop: 2x, Retina: 3x
      const baseWidth = width;
      const breakpoints = [
        { width: baseWidth, descriptor: `${baseWidth}w` },      // Mobile
        { width: Math.ceil(baseWidth * 1.5), descriptor: `${Math.ceil(baseWidth * 1.5)}w` }, // Tablet
        { width: baseWidth * 2, descriptor: `${baseWidth * 2}w` }, // Desktop
        { width: baseWidth * 3, descriptor: `${baseWidth * 3}w` }, // Retina
      ];
      
      // Build srcset strings with width descriptors (better than density descriptors)
      // Note: This assumes the server can serve images at different sizes
      // For now, we'll use density descriptors as fallback since we don't have multiple image sizes
      const sizes = [
        { density: '1x' },
        { density: '1.5x' },
        { density: '2x' },
      ];
      
      const fallbackSrcset = sizes.map(s => `${sources.fallback} ${s.density}`).join(', ');
      const webpSrcset = sources.webp ? sizes.map(s => `${sources.webp} ${s.density}`).join(', ') : null;
      
      return { webpSrcset, fallbackSrcset };
    }
    
    // Fallback: density-based srcset if no width provided
    if (!src.includes('.svg')) {
      const fallbackSrcset = `${sources.fallback} 1x, ${sources.fallback} 2x`;
      const webpSrcset = sources.webp ? `${sources.webp} 1x, ${sources.webp} 2x` : null;
      return { webpSrcset, fallbackSrcset };
    }
    
    return null;
  }, [srcset, width, sources, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Default sizes if not provided - responsive sizes for better performance
  const defaultSizes = sizes || (width 
    ? `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`
    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px');

  // If error loading WebP, fall back to original
  const currentSrc = imageError ? sources.fallback : (webpSrc || sources.fallback || src);

  // For SVG files, use simple img tag (no WebP conversion needed)
  if (src.endsWith('.svg')) {
    return (
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover', ...style } : style}
        aria-label={alt}
      />
    );
  }

  // For images with WebP support (only if WebP source is explicitly provided)
  if (sources.webp && sources.webp !== sources.fallback) {
    return (
      <picture>
        {/* WebP source */}
        <source
          srcSet={responsiveSrcset?.webpSrcset || sources.webp}
          type="image/webp"
          sizes={defaultSizes}
        />
        {/* Fallback source */}
        <source
          srcSet={responsiveSrcset?.fallbackSrcset || sources.fallback}
          type={sources.fallback.endsWith('.png') ? 'image/png' : 'image/jpeg'}
          sizes={defaultSizes}
        />
        {/* Fallback img tag */}
        <img
          src={sources.fallback}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            ...(fill
              ? { width: '100%', height: '100%', minHeight: '100%', objectFit: 'cover' }
              : {
                  aspectRatio: width && height ? `${width} / ${height}` : undefined,
                  willChange: !isLoaded ? 'opacity' : undefined,
                  maxWidth: '100%',
                  height: 'auto',
                }),
          }}
          aria-label={alt}
        />
      </picture>
    );
  }

  // Standard image without WebP conversion
  return (
    <img
      src={currentSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      srcSet={responsiveSrcset?.fallbackSrcset || srcset}
      sizes={defaultSizes}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        ...style,
        ...(fill
          ? { width: '100%', height: '100%', minHeight: '100%', objectFit: 'cover' }
          : {
              aspectRatio: width && height ? `${width} / ${height}` : undefined,
              willChange: !isLoaded ? 'opacity' : undefined,
              maxWidth: '100%',
              height: 'auto',
            }),
      }}
      aria-label={alt}
    />
  );
}
