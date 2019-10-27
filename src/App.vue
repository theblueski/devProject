<!--
 * @Author: your name
 * @Date: 2019-10-27 10:58:18
 * @LastEditTime: 2019-10-27 11:17:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/App.vue
 -->
<template>
  <div id="app">
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Row, Col } from 'vant'
export default {
  name: 'app',
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  .buttom-menu {
    height: 64px;
  }
}
</style>
