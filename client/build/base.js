module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 7777,
    proxy: {
      '/custom': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
