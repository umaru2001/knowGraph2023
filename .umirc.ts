import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/index' },
  ],
  fastRefresh: {},
  mfsu: {},
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        pathRewrite: { '^/api': '' },
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
