module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      evp: 'evp'
    }
  },
  devServer: {
    proxy: {
      '/serve': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
