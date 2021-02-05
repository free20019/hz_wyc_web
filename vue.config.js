const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  devServer: {
    port: 3000
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons')) // icons存放地（svg放的地方）
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')) // icons存放地（svg放的地方）
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
