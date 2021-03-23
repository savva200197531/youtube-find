<template>
  <router-view></router-view>
</template>

<script>
import router from '@/router/router';

export default {
  name: 'App',
  components: {},
  computed: {},
  methods: {},
  mounted() {
    if (!JSON.parse(localStorage.getItem('user')) && router.currentRoute.path !== '/auth') {
      router.push('/auth');
    }
  },
  destroyed() {
    this.userOffline();
  }
}
</script>

<style lang="scss">
.hiddenOverflow {
  overflow: hidden;
}
</style>
