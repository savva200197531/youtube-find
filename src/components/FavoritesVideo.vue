<template>
  <div class="favorites-video">
<!--    <div v-for="(favorite, key) in favorites" :key="key">-->
    <h1>Избранное</h1>
      <a-list bordered :data-source="getFavoritesArr">
        <a-list-item @click="findThis(favorite)" class="favorite" slot="renderItem" slot-scope="favorite">
          {{ favorite.name }}
        </a-list-item>
      </a-list>
<!--    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import router from '@/router/router';

export default {
  name: "favoritesVideo",
  computed: {
    ...mapState('videoStorage', [
        'favorites'
    ]),
    ...mapGetters('videoStorage', [
        'getFavoritesArr'
    ])
  },
  methods: {
    ...mapActions('videoStorage', [
        'getVideos',
        // 'initFavoritesState'
    ]),
    findThis(favorite) {
      this.getVideos({
        max: favorite.max,
        order: favorite.order,
        request: favorite.request
      });
      router.push('/');
    },
  },
  mounted() {
    // this.initFavoritesState();
  }
}
</script>

<style lang="scss" scoped>

.favorites-video {
  padding: 0 50px;
}

.favorite {
  cursor: pointer;

  &:hover {
    transition: .3s ease;
    opacity: 0.8;
  }
}
</style>
