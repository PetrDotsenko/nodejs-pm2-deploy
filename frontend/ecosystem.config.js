require('dotenv').config({ path: '../.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/main',
  DEPLOY_PATH_FRONTEND = '/home/user/apps/nodejs-pm2-deploy'
} = process.env;

module.exports = {
  apps: [
    {
      name: 'web-plus-frontend',
      script: 'serve',
      args: '-s build -l 5000',
      instances: 1,
      autorestart: true,
      watch: false
    }
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH_FRONTEND,
      'pre-deploy-local': `scp ./frontend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_FRONTEND}/frontend || true`,
      'post-deploy': `cd ${DEPLOY_PATH_FRONTEND}/frontend && NODE_OPTIONS=--openssl-legacy-provider npm ci && NODE_OPTIONS=--openssl-legacy-provider npm run build`
    }
  }
};