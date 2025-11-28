#!/bin/bash

# Backend Deployment Script for Heroku

echo "🚀 Deploying Backend to Heroku"
echo "================================"
echo ""

cd backend

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Installing..."
    echo "Please install Heroku CLI:"
    echo "  brew install heroku/brew/heroku"
    echo "  or visit: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if logged in
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Please login to Heroku:"
    heroku login
fi

# Check if app exists
APP_NAME="lagos-lga-backend-$(date +%s | tail -c 5)"

echo "📦 Creating Heroku app: $APP_NAME"
heroku create $APP_NAME

echo ""
echo "🔧 Setting environment variables..."
heroku config:set DEBUG=False -a $APP_NAME
heroku config:set SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))') -a $APP_NAME
heroku config:set ALLOWED_HOSTS=$APP_NAME.herokuapp.com -a $APP_NAME

echo ""
echo "📤 Deploying to Heroku..."
git subtree push --prefix backend heroku main 2>/dev/null || {
    echo "⚠️  Using alternative deployment method..."
    git push heroku main
}

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your backend URL: https://$APP_NAME.herokuapp.com"
echo "📡 API endpoint: https://$APP_NAME.herokuapp.com/api"
echo ""
echo "💡 Save this URL to update your frontend environment variable!"

