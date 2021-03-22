<template>
  <div class="find-video">
    <header-component></header-component>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
<!--    <a-layout-footer>Footer</a-layout-footer>-->
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';

export default {
  name: "mainLayout",
  components: {
    HeaderComponent
  }
}
</script>

<style lang="scss" scoped>

</style>
