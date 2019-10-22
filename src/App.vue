<template>
  <div id="app">
    <Button>我是好人</Button>
    <Field v-model="value" placeholder="请输入用户名" />
  </div>
</template>
<script>
import { Button, Field } from 'vant'

export default {
  name: 'app',
  components: {
    Button,
    Field
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
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
