import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}
const stripePromise = loadStripe(publishableKey);

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

export interface CreateCheckoutSessionRequest {
  items: CheckoutItem[];
  customerEmail?: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession(
  request: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    // Try to parse as JSON, fallback to text if it fails
    let errorMessage = 'Failed to create checkout session';
    try {
      const error = await response.json();
      errorMessage = error.error || errorMessage;
    } catch {
      // If JSON parsing fails, get the text response
      const text = await response.text();
      errorMessage = text || `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  // Parse response as JSON
  try {
    return await response.json();
  } catch (error) {
    throw new Error('Invalid response from server. Please try again.');
  }
}

export async function redirectToCheckout(sessionId: string): Promise<void> {
  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw new Error(error.message || 'Failed to redirect to checkout');
  }
}

export async function getCheckoutSession(sessionId: string) {
  const response = await fetch(`/api/checkout-session/${sessionId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to retrieve session');
  }

  return response.json();
}

export { stripePromise };