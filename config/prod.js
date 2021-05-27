module.exports = {
  env: {
    NODE_ENV: '"production"',
    RECORDTAB: '"records"',
    TCBENV: '"carbon-free-1gzp5o087d63e0f3"',
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
