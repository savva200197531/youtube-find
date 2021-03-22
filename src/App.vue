<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '@/router/router';

export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState('authStorage', [
      'user'
    ])
  },
  methods: {
    ...mapActions('authStorage', [
      'initUsersState'
    ])
  },
  mounted() {
    this.initUsersState();
    console.log(JSON.parse(localStorage.getItem('user')))
    if (!JSON.parse(localStorage.getItem('user')) && router.currentRoute.path !== '/auth') {
      router.push('/auth');
    }
  },
  destroyed() {
    this.userOffline();
  }
}
</script>

<style>

</style>
