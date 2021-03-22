<template>
  <a-layout>
    <a-layout-header class="header">
      <router-link to="/"><img src="../assets/img/logo.svg" alt="logo"></router-link>
      <a-tabs class="nav" v-model="activeKey" @change="navigate">
        <a-tab-pane
            v-for="route in routes"
            :tab="route.text"
            :key="route.key"
            @click="navigate"
        >
        </a-tab-pane>
      </a-tabs>
      <span class="logout" @click="userLogout">Выйти</span>
    </a-layout-header>
  </a-layout>
</template>

<script>
import router from '@/router/router';
import { mapState, mapActions } from 'vuex';

export default {
  name: "headerComponent",
  data() {
    const routes = [
      {
        to: '/',
        text: 'Поиск',
        key: '1'
      },
      {
        to: '/favorites',
        text: 'Избранное',
        key: '2'
      }
    ];
    return {
      activeKey: routes.find(route => route.to === router.currentRoute.path).key,
      routes
    }
  },
  computed: {
    ...mapState('authStorage', [
      'user', 'users'
    ])
  },
  methods: {
    ...mapActions('authStorage', [
        'userLogout'
    ]),
    navigate() {
      router.push(this.routes.find(route => route.key === this.activeKey).to);
    }
  },
  watch: {
    '$route' (to) {
      this.activeKey = this.routes.find(route => route.to === to.path).key;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  display: flex;
  background: white;
  align-items: center;
}

.logo {}
.nav {}

.logout {
  margin-left: auto;
  color: #1390E5;
  font-size: 18px;
  cursor: pointer;
}
</style>
