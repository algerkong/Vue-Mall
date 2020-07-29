<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  .tab-bar{
    width: 100%;
    height: 49px;
    display: flex;
    padding-top: 5px;

    position: fixed;
    bottom: 0;
    left: 0;

    box-shadow: 0 0 3px 0 #0000001f;
    background-color: var(--color-background);
  }
</style>
