<template>
  <div class="find-video">
    <div class="find-input" :class="newRequest ? 'top' : 'middle'">
      <h1 class="title">Поиск видео</h1>
      <a-input-search
          placeholder="Что хотите посмотреть?"
          enter-button="Найти"
          size="large"
          @search="onSearch"
          class="search"
          v-model="request"
      >

        <a-popover class="favorites-popover" placement="bottom" slot="suffix"
                   v-if="getFavoritesArr.some(favorite => favorite.request === request)">
          <template slot="content">
            <span>Поиск сохранён в разделе «Избранное»</span>
            <router-link to="/favorites">Перейти в избранное</router-link>
          </template>
          <a-icon theme="twoTone" two-tone-color="#eb2f96" heigth="100px" width="100px" type="heart"
                  class="search-suffix-active search-suffix"/>
        </a-popover>

        <a-icon @click="!!request.trim().length && openForm({request, redact: false})" type="heart" slot="suffix" v-else
                class="search-suffix"/>

      </a-input-search>
    </div>
    <div class="videos-wrapper" v-if="result.videos.length">
      <div class="videos-top">
        <div class="videos-info">
          <span class="videos-info-request">Видео по запросу "{{ newRequest }}"</span><span
            class="videos-info-views">{{ result.totalResults }}</span>
        </div>
        <div>
          <a-radio-group :default-value="true" v-model="row" size="large">
            <a-radio-button :value="true">
              <a-icon type="unordered-list"/>
            </a-radio-button>
            <a-radio-button :value="false">
              <a-icon type="appstore"/>
            </a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="videos" :class="row ? 'videos-style__column' : 'videos-style__row'">
        <div v-for="video in result.videos" class="video" :key="video.id">
          <div class="video-img__wrapper">
            <div>
              <img :src="video.preview.url" alt="dog" class="video-img" v-if="video.preview">
            </div>
          </div>
          <div class="video-info">
            <h5 class="video-title">
              {{ video.title }}
            </h5>
            <div class="video-info-bottom">
              <p class="video-channel">
                {{ video.channel }}
              </p>
              <p class="video-views">
                {{ video.views }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "findVideo",
  data: () => ({
    request: '',
    row: true,
    favorite: false,
    showForm: false
  }),
  computed: {
    ...mapState('videoStorage', [
      'result'
    ]),
    ...mapGetters('videoStorage', [
      'getRequest',
      'getFavoritesArr'
    ]),
    newRequest: {
      get() {
        return this.getRequest
      },
      set(newValue) {
        return newValue
      }
    }
  },
  methods: {
    ...mapActions('videoStorage', [
      'getVideos',
      'openForm'
    ]),
    onSearch() {
      if (!this.request.trim().length) return;
      this.getVideos({
        request: this.request
      });
    }
  },
  mounted() {
    if (this.newRequest.length) {
      this.request = this.newRequest;
    }
  },
  destroyed() {
    this.request = '';
  }
}
</script>

<style lang="scss" scoped>
.find-input {
  //transition: .4s ease;

  &.top {
    margin: 20px auto 0 auto;
    padding: 0 50px;
    text-align: left;

    .search {
      margin-top: 0;
    }
  }

  &.middle {
    margin: 280px auto 0 auto;
    max-width: 700px;
    text-align: center;
  }
}

.title {
  font-size: 36px;
}

.search {
  margin-top: 40px;
}

.search-suffix {
  cursor: pointer;

  &.anticon {
    margin-right: 20px;
    font-size: 24px;
  }
}

.search-suffix-active {
}

.favorites-popover {
  max-width: 220px;
}

.videos-wrapper {
  padding: 0 50px;
}

.videos {
  display: grid;

  &.videos-style__column {
    grid-column-gap: 20px;
    grid-row-gap: 32px;
    grid-template-columns: repeat(1, minmax(245px, 1fr));

    .video {
      display: grid;
      grid-template-columns: 157px 1fr;
      grid-gap: 20px;
    }
  }

  &.videos-style__row {
    grid-column-gap: 20px;
    grid-row-gap: 28px;
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
  }
}

.videos-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.videos-info {
  font-weight: normal;
  font-size: 16px;
}

.videos-info-views {
  margin-left: 15px;
  color: rgba(23, 23, 25, 0.3);
}

.video-img__wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: 8px;
}

.video-img__wrapper > div {
  //position: absolute;
  //top: 0;
  //left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.video-img__wrapper > div > img {
  width: 100%;
  height: 100%;
}

.video-info {
  font-weight: normal;
  font-size: 14px;
  color: rgba(23, 23, 25, 0.3);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  * {
    margin-bottom: 0;
  }
}

.video-title {
  font-weight: 500;
  color: black;
}
</style>
