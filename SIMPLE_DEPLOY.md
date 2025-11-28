# Simple Deployment Instructions

## Quick Deploy (Automated)

Run the automated deployment script:

```bash
./deploy-all.sh
```

This will:
1. ✅ Deploy backend to Heroku
2. ✅ Deploy frontend to Vercel
3. ✅ Configure environment variables

## Manual Deployment

### Backend to Heroku

```bash
cd backend

# Login to Heroku (if not already)
heroku login

# Create app
heroku create lagos-lga-api

# Initialize git (if needed)
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
git push heroku main
```

**Save your backend URL:** `https://lagos-lga-api.herokuapp.com`
**API endpoint:** `https://lagos-lga-api.herokuapp.com/api`

### Frontend to Vercel

```bash
cd frontend

# Install Vercel CLI (if needed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# When prompted, add environment variable:
# REACT_APP_API_URL = https://lagos-lga-api.herokuapp.com/api
```

**OR** use Vercel Dashboard:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set Root Directory: `frontend`
4. Add Environment Variable:
   - Name: `REACT_APP_API_URL`
   - Value: `https://lagos-lga-api.herokuapp.com/api`
5. Deploy

## Troubleshooting

### Heroku: "Couldn't find that app"
- Make sure you're logged in: `heroku login`
- Check your apps: `heroku apps`
- The app name might be different, check with `heroku apps`

### Heroku: "error: src refspec main does not match"
- Make sure you're on the main branch: `git branch -M main`
- Commit your changes: `git add . && git commit -m "Deploy"`

### Vercel: Build fails
- Check that `package.json` has `vercel-build` script
- Verify environment variables are set correctly

