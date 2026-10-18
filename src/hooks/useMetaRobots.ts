import { useEffect } from 'react';

export const useMetaRobots = (content: string) => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousContent = meta ? meta.getAttribute('content') : null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);

    return () => {
      if (meta) {
        if (previousContent) {
          meta.setAttribute('content', previousContent);
        } else {
          meta.setAttribute('content', 'index, follow');
        }
      }
    };
  }, [content]);
};
