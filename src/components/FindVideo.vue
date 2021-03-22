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
      />
    </div>
    <div class="videos-wrapper" v-if="result.videos.length">
      <span>Видео по запросу {{ newRequest }}</span><span>{{ result.totalResults }}</span>
      <div class="videos">
        <div v-for="video in result.videos" class="video" :key="video.id">
          {{ video.title }}
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
    request: 'Влад а4'
  }),
  computed: {
    ...mapState('videoStorage', [
        'result'
    ]),
    ...mapGetters('videoStorage', [
       'getRequest'
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
      'getVideos'
    ]),
    onSearch() {
      if (!this.request.trim().length) return;
      this.getVideos({
        max: '12',
        request: this.request
      });
    }
  },
  mounted() {
    // console.log(this.result.request)
    if (this.newRequest.length) {
      this.request = this.newRequest;
    }
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
      margin-top: 0 ;
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
</style>
