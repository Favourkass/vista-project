#!/bin/bash

# Complete Deployment Script for Backend (Heroku) and Frontend (Vercel)

set -e

echo "🚀 Lagos LGA Dashboard - Complete Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Deploy Backend to Heroku
echo -e "${BLUE}Step 1: Deploying Backend to Heroku${NC}"
echo "----------------------------------------"

cd backend

# Check Heroku CLI
if ! command -v heroku &> /dev/null; then
    echo -e "${YELLOW}⚠️  Heroku CLI not found. Please install it:${NC}"
    echo "   brew install heroku/brew/heroku"
    exit 1
fi

# Check if logged in
if ! heroku auth:whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to Heroku...${NC}"
    heroku login
fi

# Create app if it doesn't exist
APP_NAME="lagos-lga-api"
if ! heroku apps:info $APP_NAME &> /dev/null; then
    echo "📦 Creating Heroku app: $APP_NAME"
    heroku create $APP_NAME
else
    echo "✅ Heroku app already exists: $APP_NAME"
fi

# Initialize git if needed
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Heroku"
fi

# Set branch to main
git branch -M main 2>/dev/null || true

# Add Heroku remote
if ! git remote | grep -q heroku; then
    echo "🔗 Adding Heroku remote..."
    heroku git:remote -a $APP_NAME
fi

# Set environment variables
echo "🔧 Setting environment variables..."
SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))' 2>/dev/null || echo "change-me-in-production-$(date +%s)")
heroku config:set DEBUG=False SECRET_KEY="$SECRET_KEY" ALLOWED_HOSTS="$APP_NAME.herokuapp.com" -a $APP_NAME

# Deploy
echo "📤 Deploying to Heroku..."
git add .
git commit -m "Deploy to Heroku" --allow-empty 2>/dev/null || true
git push heroku main --force

# Get the URL
BACKEND_URL="https://$APP_NAME.herokuapp.com"
API_URL="$BACKEND_URL/api"

echo ""
echo -e "${GREEN}✅ Backend deployed successfully!${NC}"
echo -e "${GREEN}🌐 Backend URL: $BACKEND_URL${NC}"
echo -e "${GREEN}📡 API URL: $API_URL${NC}"
echo ""

# Step 2: Update Frontend and Deploy to Vercel
cd ../frontend

echo -e "${BLUE}Step 2: Deploying Frontend to Vercel${NC}"
echo "----------------------------------------"

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to Vercel...${NC}"
    vercel login
fi

# Set environment variable
echo "🔧 Setting environment variable: REACT_APP_API_URL=$API_URL"
export REACT_APP_API_URL=$API_URL

# Deploy
echo "📤 Deploying to Vercel..."
vercel --prod --env REACT_APP_API_URL=$API_URL

echo ""
echo -e "${GREEN}✅ Frontend deployed successfully!${NC}"
echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "📋 Summary:"
echo "   Backend:  $BACKEND_URL"
echo "   API:      $API_URL"
echo "   Frontend: Check Vercel dashboard for URL"
echo ""
echo "💡 Don't forget to:"
echo "   1. Update REACT_APP_API_URL in Vercel dashboard: $API_URL"
echo "   2. Test the deployed application"

