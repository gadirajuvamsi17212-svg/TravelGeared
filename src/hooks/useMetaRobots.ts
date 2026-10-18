import { useEffect } from 'react';

export function useMetaRobots(directive: string = 'index, follow') {
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', directive);
  }, [directive]);
}
