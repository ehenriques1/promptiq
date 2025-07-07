# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- Stripe account (for payments)
- OpenAI API key

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

## Step 3: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required Environment Variables:
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
- `OPENAI_API_KEY` - Your OpenAI API key

### How to get these values:

#### Stripe Keys:
1. Go to [stripe.com/dashboard](https://stripe.com/dashboard)
2. Navigate to Developers > API keys
3. Copy the "Secret key" and "Publishable key"

#### Stripe Webhook Secret:
1. In Stripe Dashboard, go to Developers > Webhooks
2. Create a new webhook endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the webhook signing secret

#### OpenAI API Key:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to API Keys
3. Create a new API key

## Step 4: Deploy

1. After adding environment variables, Vercel will automatically deploy
2. Your app will be available at `https://your-project-name.vercel.app`

## Step 5: Test the Deployment

1. Test the main page loads correctly
2. Test the prompt evaluation feature
3. Test Stripe payment flow (use test cards)
4. Test webhook endpoints

## Troubleshooting

### Common Issues:
- **Build errors**: Check the build logs in Vercel dashboard
- **Environment variables**: Ensure all required variables are set
- **Stripe webhooks**: Verify the webhook URL is correct
- **API routes**: Check that all API routes are working

### Useful Commands:
```bash
# Test build locally
npm run build

# Test production build
npm run start

# Check for TypeScript errors
npx tsc --noEmit
```

## Next Steps

1. Set up a custom domain (optional)
2. Configure analytics
3. Set up monitoring
4. Configure automatic deployments from GitHub

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Stripe Documentation: https://stripe.com/docs 