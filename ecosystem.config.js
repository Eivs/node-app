module.exports = {
  apps: [
    {
      name: 'node-app',
      script: 'bin/www',
      instances: 1,
      watch: false,
      error_file: '/var/log/node-app/err.log',
      out_file: '/var/log/node-app/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      exec_mode: 'cluster',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
