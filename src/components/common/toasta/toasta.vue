<template>
  <div class="toasta" v-show="show">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: "toasta",
/*    props:{
      msg:{
        type:String,
        default:''
      },
      show:{
        type: Boolean,
        default: false
      }
    },*/
    data(){
      return{
        msg:'',
        isShow:false
      }
    },
    methods:{
      show(msg,duration){
        this.isShow = true;
        this.msg = msg;
        setTimeout(()=>{
          this.isShow = false;
          this.msg = '';
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toasta{
    position: fixed;
    bottom: 30%;
    left: 50%;
    right: 50%;
    margin: auto;
    background-color: rgba(51, 51, 51, 0.8);
    padding: 5px 10px;
  }
</style>
