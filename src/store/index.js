import Vue from 'vue';
import Vuex from 'vuex';

import authStorage from '@/store/modules/authStorage';
import videoStorage from '@/store/modules/videoStorage';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authStorage,
    videoStorage
  },
});

export default store;
