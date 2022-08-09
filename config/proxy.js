/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/server/': {
      // target: 'http://47.102.132.205:30142/',
      // target: 'http://127.0.0.1:8000/',
      target: 'http://114.115.249.201:8001/',
      changeOrigin: true,
      pathRewrite: {
        '^/server': '',
      },
    },
    '/media/': {
      target: 'http://114.115.249.201:8001/',
      // target: "http://127.0.0.1:8000/",
      changeOrigin: true,
      pathRewrite: {
        '^/media': '/media',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
      '/server/': {
        // target: 'http://127.0.0.1:8000/',
        target: 'http://47.111.13.213:8001/',
        changeOrigin: true,
        pathRewrite: {
          '^/server': '',
        },
      },
      '/media/': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        pathRewrite: {
          '^/media': '/media',
        },
      },
    },
    pre: {
      '/api/': {
        target: 'your pre url',
        changeOrigin: true,
        pathRewrite: {
          '^': '',
        },
      },
    },
  }
}
