const proxy = require('http-proxy-middleware');
// locahost:3000/api/somedata=ss
// 'http://api.meituan.com/somedata=ss'
module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'http://api.meituan.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '', // rewrite path
        }
    }));
    app.use(proxy('/group', {
        target: 'http://api.meituan.com/',
        changeOrigin: true,
    }));
};