<template>
  <div class="find-video">
    <header-component></header-component>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import { mapActions } from 'vuex';

export default {
  name: "mainLayout",
  components: {
    HeaderComponent
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
    this.initUsersState();
    this.initFavoritesState();
  }
}
</script>

<style lang="scss" scoped>

</style>
