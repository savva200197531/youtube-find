<template>
  <div class="favorites-video">
    <h1>Избранное</h1>
    <a-list bordered :data-source="getFavoritesArr">
      <a-list-item class="favorite" slot="renderItem" slot-scope="favorite">
        <div @click="findThis(favorite)" class="favorite-name">{{ favorite.name }}</div>
        <div class="favorite-controls">
          <span @click="changeFavorite(favorite)" class="change">Изменить</span>
          <span @click="deleteFavorite(favorite)" class="delete">Удалить</span>
        </div>
      </a-list-item>
    </a-list>
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
    ...mapState('authStorage', [
      'user'
    ]),
    ...mapGetters('videoStorage', [
      'getFavoritesArr'
    ])
  },
  methods: {
    ...mapActions('videoStorage', [
      'getVideos',
      'deleteFavoriteFromDB',
        'openForm'
    ]),
    findThis(favorite) {
      this.getVideos({
        max: favorite.max,
        order: favorite.order,
        request: favorite.request
      });
      router.push('/');
    },
    changeFavorite(favorite) {
      console.log(favorite);
      this.openForm({
        request: favorite.request,
        redact: true,
        currentFavorite: favorite
      });
    },
    deleteFavorite(favorite) {
      console.log(favorite);
      this.deleteFavoriteFromDB({
        userId: this.user.id,
        id: favorite.id
      })
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
  display: flex;
  justify-content: space-between;
}

.favorite-name {
  width: 80%;

  &:hover {
    transition: .3s ease;
    opacity: 0.8;
  }
}

.favorite-controls {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.change {
  color: #1390E5;
}

.delete {
  color: #FF0000;
}

</style>
