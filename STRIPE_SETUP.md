# Stripe Integration Setup Guide

## 1. Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**

## 2. Update Environment Variables

Edit your `.env.local` file and replace the placeholder values:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-your-actual-openai-key

# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key

# Stripe Webhook Secret (optional - for webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 3. Set Up Webhooks (Optional)

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL to: `https://your-domain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook signing secret to your `.env.local`

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. Go to your app and enter a prompt
3. Click the payment button
4. Complete the test payment in Stripe Checkout
5. You should be redirected back to the results page

## 5. Production Deployment

1. Switch to live keys in your production environment
2. Update webhook endpoint URL to your production domain
3. Test the complete payment flow

## Features Included

- ✅ Stripe Checkout integration
- ✅ Payment processing with metadata
- ✅ Webhook handling for payment events
- ✅ Success/failure handling
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

## Pricing

- **Test Mode**: $9.99 per evaluation
- **Live Mode**: Configure your own pricing in the checkout session

## Security Notes

- ✅ Environment variables are properly secured
- ✅ Webhook signature verification
- ✅ Client-side keys are public (safe)
- ✅ Server-side keys are private
- ✅ Payment metadata includes prompt for tracking 