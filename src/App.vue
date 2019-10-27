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
  .buttom-menu {
    height: 64px;
  }
}
</style>
