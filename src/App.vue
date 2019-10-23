<!--
 * @Author: your name
 * @Date: 2019-10-22 22:12:01
 * @LastEditTime: 2019-10-24 00:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/App.vue
 -->

<template>
  <div id="app">
    <div class="view-container">
      <router-view></router-view>
    </div>
    <div class="buttom-menu">
      <buttomMenu></buttomMenu>
    </div>
  </div>
</template>
<script>
import { Row, Col } from 'vant'
import buttomMenu from '@/components/commonponent/buttomMenu'
export default {
  name: 'app',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    buttomMenu
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
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .view-container {
    flex: 1;
  }

  .buttom-menu {
    height: 64px;
  }
}
</style>
