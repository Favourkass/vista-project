#!/bin/bash

# Deploy Backend to Render

set -e

echo "🎨 Deploying Backend to Render"
echo "==============================="
echo ""

echo "📋 Render Deployment Instructions:"
echo ""
echo "1. Go to https://render.com and sign up/login"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository"
echo "4. Configure:"
echo "   - Name: lagos-lga-api"
echo "   - Root Directory: backend"
echo "   - Environment: Python 3"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: gunicorn config.wsgi:application --bind 0.0.0.0:\$PORT"
echo ""
echo "5. Environment Variables:"
echo "   - DEBUG = False"
echo "   - SECRET_KEY = (click Generate or use random string)"
echo "   - ALLOWED_HOSTS = lagos-lga-api.onrender.com"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "✅ Your API will be at: https://lagos-lga-api.onrender.com/api"
echo ""
echo "💡 Note: Free tier spins down after 15 min inactivity"
echo "   First request may take ~30 seconds to wake up"

