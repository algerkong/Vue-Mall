<template>
  <div class="tab-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon2"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick() {
        if (!this.isActive) {
          this.$router.replace(this.path);
        }
      }
    }
  }
</script>

<style scoped>
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }

  .tab-item img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    fill: #42b983;
  }

  .active {
    color: darkred;
  }
</style>
