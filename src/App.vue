<template>
  <router-view></router-view>
</template>

<script>
import router from '@/router/router';

export default {
  name: 'App',
  components: {},
  computed: {},
  methods: {
    authCheck() {
      if (!JSON.parse(localStorage.getItem('user')) && router.currentRoute.path !== '/auth') {
        router.push('/auth');
      }
    }
  },
  mounted() {
    this.authCheck();
  },
  destroyed() {
    this.userOffline();
  },
  watch: {
    '$route' () {
      this.authCheck();
    }
  }
}
</script>

<style lang="scss">
.hiddenOverflow {
  overflow: hidden;
}
</style>
