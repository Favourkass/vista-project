# Deployment Guide

This guide will help you deploy the frontend to Vercel and push the repositories to Git.

## Prerequisites

- Git installed
- Vercel account (sign up at https://vercel.com)
- GitHub account (or GitLab/Bitbucket)

## Step 1: Initialize Git Repository

### Option A: Single Repository (Monorepo)

```bash
# From the project root
cd /Users/admin/vista-project
git init
git add .
git commit -m "Initial commit: Lagos LGA Ranking Dashboard"
```

### Option B: Separate Repositories

#### Frontend Repository:
```bash
cd /Users/admin/vista-project/frontend
git init
git add .
git commit -m "Initial commit: Frontend"
```

#### Backend Repository:
```bash
cd /Users/admin/vista-project/backend
git init
git add .
git commit -m "Initial commit: Backend API"
```

## Step 2: Create GitHub Repositories

1. Go to https://github.com/new
2. Create a new repository (e.g., `lagos-lga-dashboard` or separate repos for frontend/backend)
3. **Don't** initialize with README, .gitignore, or license

## Step 3: Push to GitHub

### For Monorepo:
```bash
cd /Users/admin/vista-project
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### For Separate Repos:
```bash
# Frontend
cd /Users/admin/vista-project/frontend
git remote add origin https://github.com/YOUR_USERNAME/frontend-repo.git
git branch -M main
git push -u origin main

# Backend
cd /Users/admin/vista-project/backend
git remote add origin https://github.com/YOUR_USERNAME/backend-repo.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy Frontend to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from frontend directory:
```bash
cd /Users/admin/vista-project/frontend
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

5. Set environment variable:
```bash
vercel env add REACT_APP_API_URL
# Enter your backend API URL when prompted (e.g., http://localhost:8000/api for dev)
# Select: Production, Preview, Development
```

6. Redeploy with environment variable:
```bash
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (if monorepo) or `.` (if separate repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.herokuapp.com/api`)
5. Click **Deploy**

## Step 5: Update API URL

After deploying, update the `REACT_APP_API_URL` in Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add/Update `REACT_APP_API_URL` with your backend URL
4. Redeploy

## Step 6: Deploy Backend (Optional)

You can deploy the backend to:
- **Heroku**: https://devcenter.heroku.com/articles/getting-started-with-python
- **Railway**: https://railway.app
- **Render**: https://render.com
- **DigitalOcean App Platform**: https://www.digitalocean.com/products/app-platform

### Quick Heroku Deployment:

```bash
cd /Users/admin/vista-project/backend

# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main

# Set environment variables if needed
heroku config:set DEBUG=False
```

## Environment Variables

### Frontend (.env or Vercel):
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (if deploying):
```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=your-domain.com
```

## Troubleshooting

### Vercel Build Fails:
- Check that `package.json` has `vercel-build` script
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### CORS Issues:
- Ensure backend has `CORS_ALLOW_ALL_ORIGINS = True` (for development)
- For production, set specific origins in Django settings

### API Not Connecting:
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check backend is deployed and accessible
- Check browser console for CORS errors

## Next Steps

1. ✅ Frontend deployed to Vercel
2. ✅ Code pushed to GitHub
3. 🔄 Deploy backend (optional)
4. 🔄 Update API URL in Vercel
5. 🔄 Test the deployed application

## Useful Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Deploy to Vercel
cd frontend && vercel --prod
```

