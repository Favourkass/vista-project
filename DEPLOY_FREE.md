# Free Backend Deployment Options

Since Heroku is now paid, here are the best **FREE** alternatives for deploying your Django backend:

## 🚂 Railway (Recommended - Easiest)

**Free Tier:** $5 credit/month (enough for small apps)

### Deploy to Railway:

1. **Sign up:** https://railway.app (use GitHub login)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set Root Directory: `backend`

3. **Configure:**
   - Railway auto-detects Python/Django
   - Add Environment Variables:
     - `DEBUG` = `False`
     - `SECRET_KEY` = (generate a random string)
     - `ALLOWED_HOSTS` = `your-app-name.up.railway.app`
     - `PORT` = (auto-set by Railway)

4. **Deploy:**
   - Railway automatically deploys on push to main branch
   - Your API will be at: `https://your-app-name.up.railway.app/api`

### Manual Setup (if needed):

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
cd backend
railway init

# Deploy
railway up
```

---

## 🎨 Render (Best Free Tier)

**Free Tier:** Free forever (spins down after 15 min inactivity)

### Deploy to Render:

1. **Sign up:** https://render.com (use GitHub login)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `lagos-lga-api`
     - **Root Directory:** `backend`
     - **Environment:** `Python 3`
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
   
3. **Environment Variables:**
   - `DEBUG` = `False`
   - `SECRET_KEY` = (click "Generate" or use a random string)
   - `ALLOWED_HOSTS` = `lagos-lga-api.onrender.com`
   - `PORT` = (auto-set by Render)

4. **Deploy:**
   - Click "Create Web Service"
   - Your API will be at: `https://lagos-lga-api.onrender.com/api`

**Note:** Free tier spins down after 15 min of inactivity. First request may take ~30 seconds.

---

## ✈️ Fly.io (Good for Global)

**Free Tier:** 3 shared-cpu VMs, 3GB persistent volumes

### Deploy to Fly.io:

1. **Install CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign up:**
   ```bash
   fly auth signup
   ```

3. **Create app:**
   ```bash
   cd backend
   fly launch
   ```

4. **Configure:**
   - Follow prompts
   - Set environment variables in `fly.toml` or dashboard

---

## 🐍 PythonAnywhere (Simple but Limited)

**Free Tier:** Free forever (limited features)

1. Sign up: https://www.pythonanywhere.com
2. Upload your code via web interface
3. Configure web app
4. Set environment variables

**Limitation:** Free tier has restrictions on external URLs

---

## 📊 Comparison

| Platform | Free Tier | Ease of Use | Auto-Deploy | Best For |
|----------|-----------|-------------|-------------|----------|
| **Railway** | $5/month credit | ⭐⭐⭐⭐⭐ | ✅ Yes | Production apps |
| **Render** | Free forever | ⭐⭐⭐⭐ | ✅ Yes | Development/Testing |
| **Fly.io** | 3 VMs free | ⭐⭐⭐ | ✅ Yes | Global distribution |
| **PythonAnywhere** | Free forever | ⭐⭐⭐ | ❌ No | Simple apps |

---

## 🎯 Recommended: Railway or Render

### Choose Railway if:
- You want the easiest setup
- You need reliable uptime
- $5/month credit is acceptable

### Choose Render if:
- You want completely free
- You're okay with 15-min spin-up delay
- You want simple deployment

---

## 🚀 Quick Deploy Scripts

I've created configuration files:
- `backend/railway.json` - Railway config
- `backend/render.yaml` - Render config

Both platforms can auto-detect Django, but these files help with customization.

---

## 📝 After Deployment

Once deployed, update your frontend:

1. Get your backend URL (e.g., `https://your-app.up.railway.app`)
2. Update Vercel environment variable:
   - `REACT_APP_API_URL` = `https://your-app.up.railway.app/api`
3. Redeploy frontend on Vercel

---

## 🔧 Troubleshooting

### Railway:
- Check logs in Railway dashboard
- Ensure `PORT` environment variable is set (auto-set)
- Verify `ALLOWED_HOSTS` includes your Railway domain

### Render:
- First request may be slow (spinning up)
- Check "Events" tab for build logs
- Verify start command is correct

### CORS Issues:
- Both platforms: Ensure `CORS_ALLOW_ALL_ORIGINS = True` in settings
- Or set specific origins in `ALLOWED_HOSTS`

