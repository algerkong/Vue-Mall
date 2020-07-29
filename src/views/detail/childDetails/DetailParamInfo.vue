<template>
  <div class="param-info" v-if="Object(paramInfo).length !== 0">
    <table v-for="(table ,index) in paramInfo.sizes" class="info-size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info{
    border-bottom: 5px solid  #f3f3f3;
    margin: 10px;
  }
  table td {
    border-bottom: 2px solid #eee;
    padding: 7px 0;
    min-width: 70px;
    font-size: 14px;
  }


  table {
    padding: 10px;
    border-top: 5px solid #f3f3f3;
    width: 100%;
  }

  td.param-value {
    color: #c85151;
  }
</style>
