import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isApprovedIndexablePath, setRobotsMeta } from '../utils/seo';

/**
 * Custom React hook that sets the <meta name="robots" content="..." /> tag.
 * If a custom directive is passed, it uses that; otherwise it checks whether the current URL path
 * is one of the 5 approved indexable URLs.
 */
export function useMetaRobots(customDirective?: 'index, follow' | 'noindex, follow') {
  const location = useLocation();

  useEffect(() => {
    if (customDirective) {
      setRobotsMeta(customDirective);
    } else {
      const isIndexable = isApprovedIndexablePath(location.pathname);
      setRobotsMeta(isIndexable ? 'index, follow' : 'noindex, follow');
    }
  }, [location.pathname, customDirective]);
}
