<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Object,
        default: {}
      },
      // stopPropagation:{
      //   type: Boolean,
      //   default: true
      //
      // }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        //点击添加
        click: true,
        //监听滚动  0,1不监听  2 不监听惯性滚动  3  监听惯性滚动
        probeType: this.probeType,
        //上拉加载  true false
        pullUpLoad: this.pullUpLoad,
        stopPropagation: this.stopPropagation

      });
      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)

        });
      }

      // 3. 监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        });
      }

    },
    methods: {
      scrollTo(x, y, time = 400) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll.refresh();
      },
      getCurrentY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
