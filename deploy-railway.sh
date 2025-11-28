#!/bin/bash

# Deploy Backend to Railway

set -e

echo "🚂 Deploying Backend to Railway"
echo "================================"
echo ""

cd backend

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

echo "🚀 Initializing Railway project..."
railway init

echo ""
echo "🔧 Setting environment variables..."
railway variables set DEBUG=False
railway variables set SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))' 2>/dev/null || echo "change-me-$(date +%s)")

# Get the service URL
SERVICE_URL=$(railway domain 2>/dev/null || echo "")
if [ -z "$SERVICE_URL" ]; then
    echo "🌐 Generating domain..."
    railway domain
    SERVICE_URL=$(railway domain)
fi

railway variables set ALLOWED_HOSTS=$SERVICE_URL

echo ""
echo "📤 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your backend URL: https://$SERVICE_URL"
echo "📡 API endpoint: https://$SERVICE_URL/api"
echo ""
echo "💡 Update your frontend REACT_APP_API_URL with: https://$SERVICE_URL/api"

