<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <div v-if="$route.meta.keepAlive">
      <main-tab-bar/>
    </div>
    <toast/>
  </div>
</template>

<script>

import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
import Toast from "./components/common/toast/Toast";

export default {
  name: 'App',
  components: {
    Toast,
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
