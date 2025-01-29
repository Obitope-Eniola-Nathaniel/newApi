const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    headers: {
      "Content-Security-Policy": "script-src 'self' 'nonce-XYZ123';",
    },
  },
};
