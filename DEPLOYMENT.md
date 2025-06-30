# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a Vercel account
3. Have a MongoDB database (MongoDB Atlas recommended)

## Step 1: Deploy Backend to Vercel

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Create a new project
   - Add these environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production

4. **Deploy backend:**
   ```bash
   vercel
   ```

5. **Note the backend URL** (e.g., `https://your-backend.vercel.app`)

## Step 2: Deploy Frontend to Vercel

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Create a new project
   - Add this environment variable:
     - `REACT_APP_API_URL`: Your backend URL (e.g., `https://your-backend.vercel.app`)

4. **Deploy frontend:**
   ```bash
   vercel
   ```

## Step 3: Update Environment Variables

After deployment, update the environment variables in your Vercel dashboard:

### Backend Environment Variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: production

### Frontend Environment Variables:
- `REACT_APP_API_URL`: Your deployed backend URL

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Register a new account
3. Create some tasks
4. Test the search and filter functionality

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure your backend allows requests from your frontend domain
2. **Database connection**: Ensure your MongoDB URI is correct and accessible
3. **Environment variables**: Double-check all environment variables are set correctly

### Useful Commands:
- `vercel logs`: View deployment logs
- `vercel env ls`: List environment variables
- `vercel env add`: Add new environment variables 