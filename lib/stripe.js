const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
  typescript: false,
});

const getStripe = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    const { loadStripe } = require('@stripe/stripe-js');
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return null;
};

module.exports = {
  stripe,
  getStripe
}; 