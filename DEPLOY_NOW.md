# Quick Deployment Guide

## Step 1: Login to Heroku

```bash
heroku login
```

## Step 2: Deploy Backend to Heroku

Run this command from the project root:

```bash
# Create Heroku app (replace with your desired name)
APP_NAME="lagos-lga-backend-$(date +%s | tail -c 5)"
heroku create $APP_NAME

# Set environment variables
heroku config:set DEBUG=False -a $APP_NAME
heroku config:set SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))') -a $APP_NAME
heroku config:set ALLOWED_HOSTS=$APP_NAME.herokuapp.com -a $APP_NAME

# Deploy using git subtree (pushes only backend folder)
git subtree push --prefix backend heroku main
```

**OR** use the automated script:

```bash
./deploy-backend.sh
```

After deployment, save your backend URL (e.g., `https://your-app-name.herokuapp.com`)

## Step 3: Update Frontend with Backend URL

Once you have your Heroku backend URL, update the frontend:

```bash
# The backend URL will be: https://YOUR-APP-NAME.herokuapp.com
# API endpoint: https://YOUR-APP-NAME.herokuapp.com/api
```

## Step 4: Deploy Frontend to Vercel

### Option A: Vercel CLI

```bash
cd frontend
npm install -g vercel
vercel login
vercel
# When prompted for REACT_APP_API_URL, enter: https://YOUR-APP-NAME.herokuapp.com/api
vercel --prod
```

### Option B: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Root Directory: `frontend`
   - Framework: Create React App
4. Add Environment Variable:
   - Name: `REACT_APP_API_URL`
   - Value: `https://YOUR-APP-NAME.herokuapp.com/api`
5. Deploy

## Troubleshooting

If `git subtree push` doesn't work, try:

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a YOUR-APP-NAME
git push heroku main
```
