import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router';
import store from '@/store';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/styles/styles.scss';

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
