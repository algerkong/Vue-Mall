module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth: 411,   //设计稿宽度  一般为iPhone6宽度
      viewportHeight: 823,  //视窗的高度,对应的是高度(可以不配置)
      unitPrecision: 5,     //指定'px'转换时的小数位数
      viewportUnit: 'vw',   //指定需要转换的视窗单位  建议为vw
      selectorBlackList: ['tab-bar','tab-control','nav-bar','cart-price'], //指定不需要转换的类名
      minPixelValue: 1,      //小于或等于1px 不转换
      mediaQuery: false,      //允许在媒体查询中转换'px'
      exclude:[]            //必须为正则, 匹配文件, 不转换的文件
    }
  }
}
