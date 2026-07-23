#!/bin/bash
echo "🚀 Starting deployment..."

cd ~/greenworldholidays
git pull origin main
npm install --prefix backend
pm2 restart greenworld-backend

echo "✅ Deployment complete!"
