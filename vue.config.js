module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: 'postcss.config.js'
        }
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://news-at.zhihu.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api/4'
  //       }
  //     }
  //   }
  // }
}
