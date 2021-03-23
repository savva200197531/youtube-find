import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import uniqId from 'uniqid';

Vue.use(Vuex);

const youTubeKeyStr = `&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const state = {
  result: {
    videos: [
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/V3pXO0IGMYQ/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "12 Способов Пронести ЕДУ в БОЛЬНИЦУ !",
        "views": "7099629",
        "channel": "A4",
        "id": "V3pXO0IGMYQ"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/iXQpStWQVTI/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "ЭКСТРЕМАЛЬНОЕ ОГРАБЛЕНИЕ ВЛАДА А4 !",
        "views": "10170416",
        "channel": "A4",
        "id": "iXQpStWQVTI"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/DH-LzXQR0WA/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "ЭКСТРЕМАЛЬНОЕ ОГРАБЛЕНИЕ ВЛАДА А4 ! ** а4 новые серии **",
        "views": "3001504",
        "channel": "Вильям Бруно",
        "id": "DH-LzXQR0WA"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/4bonETmPRUY/mqdefault_live.jpg",
          "width": 320,
          "height": 180
        },
        "title": "ВЛАД А4 ИГРАЕТ В БРАВЛ СТАРС 24 ЧАСА а4 песня клоун кидс пол это лава прятки амонгас заработок денег",
        "views": "2270",
        "channel": "EndyWorld",
        "id": "4bonETmPRUY"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/GP_4KttcofQ/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "ВЛАД А4 - МИЛЛИОНЕР, КОТОРЫЙ УКРАЛ ВООБЩЕ ВСЁ / БОЛЬШОЕ РАССЛЕДОВАНИЕ",
        "views": "2224304",
        "channel": "SOBOLEV",
        "id": "GP_4KttcofQ"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/o3DAiRuFhXQ/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "24 Часа в АВТОСЕРВИСЕ Челлендж !",
        "views": "12102900",
        "channel": "A4",
        "id": "o3DAiRuFhXQ"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/D5wEheu9uA0/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "КТО ПОСЛЕДНИЙ ПОКИНЕТ БИОТУАЛЕТ ЧЕЛЛЕНДЖ !",
        "views": "11055663",
        "channel": "A4",
        "id": "D5wEheu9uA0"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/joXFFy4gsH0/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "Прятки в ПРЕДМЕТАХ в Реальной Жизни ! - Челлендж",
        "views": "11102545",
        "channel": "A4",
        "id": "joXFFy4gsH0"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/7DEsmRZbHcg/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "Нас Заперли в ОГРОМНОМ ШАРЕ...",
        "views": "13422169",
        "channel": "A4",
        "id": "7DEsmRZbHcg"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/DIy6rm6UzA4/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "Кто Последний Покинет КАРТОННЫЙ ДОМ Челлендж !",
        "views": "14655854",
        "channel": "A4",
        "id": "DIy6rm6UzA4"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/gxac8XGb8QY/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "Кто Сделает Лучший ТИКТОК Получит 1000$ - Челлендж",
        "views": "14060985",
        "channel": "A4",
        "id": "gxac8XGb8QY"
      },
      {
        "preview": {
          "url": "https://i.ytimg.com/vi/kuNP3Z1f07A/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "title": "Экстремальные КАМУФЛЯЖНЫЕ Прятки ! **2 Часть**",
        "views": "15880067",
        "channel": "A4",
        "id": "kuNP3Z1f07A"
      }
    ],
    request: 'Влад а4',
    totalResults: 10000
  },
  showForm: {
    show: false,
    request: ''
  },
  favorites: {}
};

const mutations = {
  setTotalResult(state, payload) {
    Vue.set(state.result, 'totalResults', payload);
  },
  setResultRequest(state, payload) {
    Vue.set(state.result, 'request', payload);
  },
  setResultVideos(state, payload) {
    Vue.set(state.result, 'videos', payload);
  },
  changeFormShow(state, payload) {
    state.showForm = payload;
  },
  setFavorites(state, payload) {
    Vue.set(state, 'favorites', payload);
  }
};

const actions = {
  // eslint-disable-next-line no-empty-pattern
  getVideos({ commit, dispatch }, payload) {
    commit('setResultRequest', payload.request);
    // console.log(payload)
    const url = 'https://youtube.googleapis.com/youtube/v3/search'
      + `?maxResults=${payload.max || '12'}`
      + `&order=${payload.order || 'relevance'}`
      + `&q=${payload.request}`
      + '&type=video'
      + youTubeKeyStr;

    axios.get(url).then(res => {
      dispatch('getVideoParameters', res.data);
      commit('setTotalResult', res.data.pageInfo.totalResults);
    });
  },

  // eslint-disable-next-line no-empty-pattern,no-unused-vars
  getVideoParameters({ commit }, payload) {
    const requests = payload.items.map(item => {
      return axios.get('https://youtube.googleapis.com/youtube/v3/videos'
        + '?part=snippet%2CcontentDetails%2Cstatistics'
        + `&id=${item.id.videoId}`
        + youTubeKeyStr);
    });
    axios.all(requests).then(res => {
      const formedVideos = res.map(video => {
        return {
          preview: video.data.items[0].snippet.thumbnails.medium,
          title: video.data.items[0].snippet.title,
          views: video.data.items[0].statistics.viewCount,
          channel: video.data.items[0].snippet.channelTitle,
          id: video.data.items[0].id
        }
      });

      commit('setResultVideos', formedVideos);
    });
  },

  openForm({ commit }, payload) {
    document.body.classList.add('hiddenOverflow')
    commit('changeFormShow', {
      show: true,
      request: payload
    });
  },

  closeForm({commit}) {
    document.body.classList.remove('hiddenOverflow');
    commit('changeFormShow', {
      show: false,
      request: ''
    });
  },

  // eslint-disable-next-line no-empty-pattern
  submitFavoriteForm({dispatch}, payload) {
    let id = uniqId();

    Object.values(state.favorites).forEach(value => {
      if (value.request === payload.request) {
        id = value.id
      }
    });

    axios.post('http://localhost:4000/favorites/new', {
      ...payload,
      id
    });
    dispatch('initFavoritesState');
  },

  // eslint-disable-next-line no-empty-pattern
  initFavoritesState({ commit }) {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get('http://localhost:4000/favorites').then(res => {
      commit('setFavorites', res.data[userId] || []);
    });
  }
};

const getters = {
  getRequest: state => {
    return state.result.request;
  },
  getFavoritesArr: state => {
    return Object.keys(state.favorites).map(key => state.favorites[key]);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
