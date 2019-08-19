module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/custom': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
