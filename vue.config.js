const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/smartfeet': {
        target: 'https://www.orthchina.cn',
        secure: false
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'utils': path.resolve('./src/utils'),
        'assets': path.resolve('./src/assets')
      }
    }
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
