
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: { use: (arg0: string, arg1: any) => void; }) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.prokerala.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',  // Removes `/api` from the URL path when forwarding to the target
            },
        })
    );
    app.use(
        '/api/token',
        createProxyMiddleware({
          target: 'https://api.prokerala.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api/token': '/token', 
          },
          onProxyReq: (proxyReq: { setHeader: (arg0: string, arg1: string) => void; }) => {
            proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded');
          },
        })
      );
};
