import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  outDir: 'dist',
  manifest: {
    name: 'Quick Scroll',
    description: 'A Chrome extension to quickly scroll to the top or bottom of a web page.',
    version: '1.0.0',
    author: 'liukai',
    permissions: ['storage'],
  }
});
