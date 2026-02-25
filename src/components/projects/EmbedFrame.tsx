'use client';

import { useState } from 'react';

interface EmbedFrameProps {
  src: string;
  title: string;
  height?: number;
}

export function EmbedFrame({ src, title, height = 750 }: EmbedFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative rounded-xl overflow-hidden border border-border" style={{ height }}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted text-sm">
          Failed to load
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 'none', visibility: loaded ? 'visible' : 'hidden' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        // allow-same-origin is required for Firebase auth (localStorage / IndexedDB session persistence)
        // safe here because the embed URL (Netlify) is a different origin from this portfolio
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
