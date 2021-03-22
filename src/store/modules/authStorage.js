import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router/router';
import uniqId from 'uniqid';

Vue.use(Vuex);

const state = {
  user: {},
  users: {}
};

const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setUserStatus(state, online) {
    state.user.online = online;
  }
};

const actions = {

  userLogin({ dispatch }, payload) {
    let id = uniqId();
    payload.online = true;

    Object.values(state.users).forEach(value => {
      if (value.login === payload.login && value.password === payload.password) {
        id = value.id
      }
    });

    dispatch('updateUser', { ...payload, id });
    dispatch('initUsersState');
    router.push('/');
  },

  userLogout({dispatch, commit}) {
    commit('setUserStatus', false);
    dispatch('updateUser', state.user);
    commit('setUser', {});
    localStorage.removeItem('user');
    router.push('/auth');
  },

  userOffline({ dispatch, commit }) {
    commit('setUserStatus', false);
    dispatch('updateUser', state.user);
  },

  // eslint-disable-next-line no-empty-pattern
  updateUser({}, payload) {
    localStorage.setItem('user', JSON.stringify({
      online: payload.online,
      id: payload.id
    }))

    axios.post('http://localhost:4000/users/new', payload);
  },

  initUsersState({ commit, dispatch }) {
    axios.get('http://localhost:4000/users').then(res => {
      commit('setUsers', res.data);

      const userDetails = JSON.parse(localStorage.getItem('user'));

      if (userDetails) {
        const user = state.users[userDetails.id]
        user.online = true;
        dispatch('updateUser', user);
        commit('setUser', user);
      }
    });
  },

  getVideosFromApi() {

  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
