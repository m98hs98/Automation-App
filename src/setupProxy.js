const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/Google',
      createProxyMiddleware({
        target: 'https://infotrack-tests.infotrack.com.au',
        changeOrigin: true,
        secure: false, // Skip SSL verification 
      })
    );
  };
  