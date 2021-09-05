const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://www.dannyhao.top:4000',	// 转发目标地址
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
        )
    )
}