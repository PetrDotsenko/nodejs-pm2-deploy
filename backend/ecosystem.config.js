module.exports = {
  apps: [
    {
      name: 'web-plus-backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.188.252',
      ref: 'origin/main',
      repo: 'https://github.com/PetrDotsenko/nodejs-pm2-deploy.git',
      path: '/home/user/apps/web-plus/backend',
      'pre-deploy-local': '',
      'post-deploy': 'npm install --no-audit --no-fund && pm2 restartOrCreate ecosystem.config.js --env production && pm2 save',
      'pre-setup': '',
    },
  },
};