module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 7777,
    proxy: {
      '/serve': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
