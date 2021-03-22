import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// AIzaSyAOzGAf90xBy92MxyJYxDZ0q47QiRZs9E0

const youTubeKeyStr = `&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`;

const state = {
  result: {
    videos: [],
    request: '',
    totalResults: 0
  }
};

const mutations = {
  setResultInfo(state, payload) {
    state.result.request = payload.request;
    state.result.totalResults = payload.totalResults;
  },
  setResultVideos(state, payload) {
    state.result.videos = payload;
  }
};

const actions = {
  // eslint-disable-next-line no-empty-pattern
  getVideos({commit, dispatch}, payload) {
    // console.log(payload)
    const url = 'https://youtube.googleapis.com/youtube/v3/search'
      + `?maxResults=${payload.max}`
      + `&q=${payload.request}`
      + '&type=video'
      + youTubeKeyStr;
    // const url = `?maxResults=25&q=surfing&type=video&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`

    axios.get(url).then(res => {
      dispatch('getVideoParameters', res.data);
      commit('setResultInfo', {
        request: payload.request,
        totalResults: res.data.pageInfo.totalResults
      })
    });
  },

  // eslint-disable-next-line no-empty-pattern,no-unused-vars
  getVideoParameters({commit}, payload) {
    const requests = payload.items.map(item => {
      return axios.get('https://youtube.googleapis.com/youtube/v3/videos'
        + '?part=snippet%2CcontentDetails%2Cstatistics'
        + `&id=${item.id.videoId}`
        + youTubeKeyStr);
    });
    axios.all(requests).then(res => {
      // console.log(res);
      const formedVideos = res.map(video => {
        return {
          preview: video.data.items[0].snippet.thumbnails.standard,
          title: video.data.items[0].snippet.title,
          views: video.data.items[0].statistics.viewCount,
          channel: video.data.items[0].snippet.channelTitle,
          id: video.data.items[0].id
        }
      });
      console.log(res)
      console.log(formedVideos)
      commit('setResultVideos', formedVideos);
    });
  }
};

const getters = {
  getRequest: state => {
    return state.result.request;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
