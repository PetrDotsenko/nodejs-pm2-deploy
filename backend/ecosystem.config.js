require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'web-plus-backend',
      script: './dist/app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ],
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF || 'origin/master',
      repo: process.env.REPO || 'https://github.com/PetrDotsenko/nodejs-pm2-deploy.git',
      path: process.env.DEPLOY_PATH,
      'pre-deploy': `scp ./backend/.env ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}/current/backend/ || true`,
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 startOrReload ./backend/ecosystem.config.js --env production'
    }
  }
};