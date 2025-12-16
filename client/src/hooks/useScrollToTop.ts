import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that scrolls to the top of the page when the route changes
 * @param behavior - The scroll behavior ('smooth' | 'instant' | 'auto')
 */
export function useScrollToTop(behavior: ScrollBehavior = 'smooth') {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior });
  }, [location, behavior]);
}

/**
 * Custom hook that scrolls to the top immediately when component mounts
 * @param behavior - The scroll behavior ('smooth' | 'instant' | 'auto')
 */
export function useScrollToTopOnMount(behavior: ScrollBehavior = 'smooth') {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);
}