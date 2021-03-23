<template>
  <div class="find-video">
    <header-component></header-component>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <add-favorite-form></add-favorite-form>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import { mapActions } from 'vuex';
import AddFavoriteForm from '@/components/AddFavoriteForm';

export default {
  name: "mainLayout",
  components: {
    HeaderComponent,
    AddFavoriteForm
  },
  methods: {
    ...mapActions('authStorage', [
      'initUsersState'
    ]),
    ...mapActions('videoStorage', [
      'initFavoritesState'
    ]),
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem('user')))
    if (JSON.parse(localStorage.getItem('user'))) {
      this.initUsersState();
      this.initFavoritesState();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
