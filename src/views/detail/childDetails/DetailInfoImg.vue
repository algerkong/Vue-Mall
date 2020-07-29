<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div>{{detailInfo.detailImage[0].desc}}</div>
<!--    <div style="text-align: center">{{detailInfo.detailImage[0].key}}</div>-->
    <div>
      <ul class="img-list">
        <li v-for="(item,index) in detailInfo.detailImage[0].list">
          <img :src="item" :key="index" :alt="index" @load="imgLoad">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailInfoImg",
    data(){
      return{
        counter:0,
        imagesLength:0
      }
    },
    props:{
      detailInfo:{
        type: Object
      }
    },
    methods:{
      imgLoad(){
        if(++this.counter === this.imagesLength){
          this.$emit('imageLoad')
        }
      }
    },
    watch:{
      detailInfo(){
        this.imagesLength = this.detailInfo.detailImage[0].list.length;
      }
    }
  }
</script>

<style scoped>
  .img-list>li>img{
    width: 100%;
    height: auto;
  }
</style>
