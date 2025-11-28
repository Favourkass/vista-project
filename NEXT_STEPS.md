# 🚀 Next Steps to Deploy

## Current Status

✅ **Backend configured for Heroku:**

- Procfile created
- Requirements.txt updated with gunicorn
- Settings.py configured for production
- Runtime.txt set

✅ **Frontend configured for Vercel:**

- vercel.json created
- package.json updated with vercel-build script

⏳ **Ready to deploy!**

## Quick Start (Choose One)

### Option 1: Automated Script (Recommended)

```bash
./deploy-all.sh
```

This script will:

1. Deploy backend to Heroku (creates app: `lagos-lga-api`)
2. Deploy frontend to Vercel
3. Configure all environment variables

**Note:** You'll need to complete Heroku login in your browser when prompted.

### Option 2: Step-by-Step Manual

#### Step 1: Deploy Backend

```bash
cd backend

# Login to Heroku (opens browser)
heroku login

# Create app
heroku create lagos-lga-api

# Initialize git repo in backend
git init
git add .
git commit -m "Initial commit"

# Add Heroku remote
heroku git:remote -a lagos-lga-api

# Set environment variables
heroku config:set DEBUG=False -a lagos-lga-api
heroku config:set SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))') -a lagos-lga-api
heroku config:set ALLOWED_HOSTS=lagos-lga-api.herokuapp.com -a lagos-lga-api

# Deploy
git branch -M main
git push heroku main
```

**Your backend will be at:** `https://lagos-lga-api.herokuapp.com`
**API endpoint:** `https://lagos-lga-api.herokuapp.com/api`

#### Step 2: Deploy Frontend

```bash
cd frontend

# Install Vercel CLI (if needed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy with environment variable
REACT_APP_API_URL=https://lagos-lga-api.herokuapp.com/api vercel --prod
```

**OR** use Vercel Dashboard:

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Root Directory: `frontend`
4. Environment Variable: `REACT_APP_API_URL = https://lagos-lga-api.herokuapp.com/api`
5. Deploy

## What You'll Get

- **Backend URL:** `https://lagos-lga-api.herokuapp.com`
- **API Endpoint:** `https://lagos-lga-api.herokuapp.com/api`
- **Frontend URL:** (from Vercel dashboard)

## Testing

After deployment, test your API:

```bash
curl https://lagos-lga-api.herokuapp.com/api/lga-scores/
```

## Troubleshooting

### Heroku Login Issues

- Complete the browser login when prompted
- Or use: `heroku login -i` for CLI login

### App Already Exists

- If `lagos-lga-api` exists, use a different name or delete it first:
  ```bash
  heroku apps:destroy lagos-lga-api
  ```

### Git Branch Issues

- Make sure you're on main branch: `git branch -M main`

## Need Help?

See `SIMPLE_DEPLOY.md` for detailed instructions.
