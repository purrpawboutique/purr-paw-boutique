import { useScrollToTop } from '@/hooks/useScrollToTop';

/**
 * Component that automatically scrolls to top when route changes
 * Place this component inside your Router to enable automatic scroll-to-top behavior
 */
export default function ScrollToTop() {
  useScrollToTop('smooth');
  return null;
}