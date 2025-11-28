#!/bin/bash

# Script to help push to GitHub and deploy to Vercel

echo "🚀 Lagos LGA Dashboard - Git & Deployment Setup"
echo "================================================"
echo ""

# Check if git remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ Git remote 'origin' already configured"
    git remote -v
else
    echo "📝 Setting up GitHub repository..."
    echo ""
    echo "Please provide your GitHub repository URL:"
    echo "Example: https://github.com/username/repo-name.git"
    read -p "GitHub URL: " github_url
    
    if [ -n "$github_url" ]; then
        git remote add origin "$github_url"
        echo "✅ Remote added: $github_url"
    else
        echo "⚠️  No URL provided. You can add it later with:"
        echo "   git remote add origin <your-github-url>"
    fi
fi

echo ""
echo "📦 Current git status:"
git status --short | head -10

echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   cd frontend"
echo "   npm install -g vercel"
echo "   vercel login"
echo "   vercel"
echo ""
echo "3. Or use Vercel Dashboard:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory to 'frontend'"
echo "   - Add environment variable: REACT_APP_API_URL"
echo ""

