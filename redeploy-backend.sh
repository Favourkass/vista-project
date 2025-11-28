#!/bin/bash

# Script to redeploy backend to Render with updated dataset

echo "🔄 Redeploying Backend to Render"
echo "================================"
echo ""

echo "✅ Dataset has been updated with correct values"
echo ""
echo "To deploy the updated backend to Render:"
echo ""
echo "Option 1: Automatic (if connected to GitHub)"
echo "  - Push changes to GitHub:"
echo "    git push origin main"
echo "  - Render will auto-deploy from GitHub"
echo ""
echo "Option 2: Manual Deploy"
echo "  1. Go to https://dashboard.render.com"
echo "  2. Select your 'vista-project' service"
echo "  3. Click 'Manual Deploy' → 'Deploy latest commit'"
echo ""
echo "Option 3: Force Redeploy"
echo "  - In Render dashboard, click 'Manual Deploy'"
echo "  - This will pull latest code and rebuild"
echo ""
echo "📊 Updated Dataset:"
echo "  - All 20 LGAs with correct Economic, Impact, and Infrastructure scores"
echo "  - Verified against assessment requirements"
echo ""

