const { createProxyMiddleware } = require('http-proxy-middleware');

const apiUrl = 'http://localhost:5001'

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: apiUrl,
            changeOrigin: true,
        })
    );
};
