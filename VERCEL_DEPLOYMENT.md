# Vercel Deployment Guide

## Quick Setup for Vercel Environment Variables

### Your Clerk Keys (from .env.local)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZmxlZXQtaGFnZmlzaC02NS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_OhNdmrzIpUII4b8NxEGPOy0SsqMw6AFQNpHJOnQMWn
```

### Steps to Add to Vercel

1. **Go to Vercel Dashboard**

   - Visit: https://vercel.com/dashboard
   - Select your project: `moveaid`

2. **Navigate to Environment Variables**

   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add the First Variable**

   - **Name**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Value**: `pk_test_ZmxlZXQtaGFnZmlzaC02NS5jbGVyay5hY2NvdW50cy5kZXYk`
   - **Environments**: Check all three boxes (Production, Preview, Development)
   - Click **Save**

4. **Add the Second Variable**

   - **Name**: `CLERK_SECRET_KEY`
   - **Value**: `sk_test_OhNdmrzIpUII4b8NxEGPOy0SsqMw6AFQNpHJOnQMWn`
   - **Environments**: Check all three boxes (Production, Preview, Development)
   - Click **Save**

5. **Redeploy (if needed)**
   - Go to **Deployments** tab
   - Click on the three dots (...) on the latest deployment
   - Click **Redeploy**
   - Or just push a new commit, and Vercel will auto-deploy

---

## For Production (Live Environment)

When you're ready to go live, you'll need to:

1. **Get Production Keys from Clerk**

   - Go to https://dashboard.clerk.com
   - Switch to your production instance
   - Get keys that start with `pk_live_` and `sk_live_`

2. **Update Vercel Environment Variables**
   - Replace the test keys with live keys
   - Make sure to update only the **Production** environment

---

## Verify Deployment

After adding environment variables and deploying:

1. Check the deployment logs for any errors
2. Visit your deployed site
3. Test the authentication flow
4. Check browser console for any Clerk-related errors

---

## Troubleshooting

### If you see "Missing Clerk keys" error:

1. ✅ Verify both variables are added in Vercel
2. ✅ Check that variable names are exactly correct (case-sensitive)
3. ✅ Ensure no extra spaces in variable names or values
4. ✅ Confirm variables are enabled for the correct environment
5. ✅ Try redeploying after adding variables

### If authentication doesn't work:

1. ✅ Verify the publishable key matches your Clerk instance
2. ✅ Check Clerk dashboard for any domain restrictions
3. ✅ Make sure your Vercel domain is added to Clerk's allowed origins
4. ✅ Check browser console for specific error messages

---

## Security Notes

⚠️ **IMPORTANT**:

- The keys shown above are TEST keys (safe for development)
- Never share your LIVE/PRODUCTION secret keys
- Rotate keys if they're accidentally exposed
- Use different keys for development and production environments
