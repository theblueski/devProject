<!--
 * @Author: your name
 * @Date: 2019-10-23 22:46:38
 * @LastEditTime: 2019-10-24 00:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/components/comomponent/buttomMenu.vue
 -->
<template>
  <section>
    <van-row type="flex">
      <van-col span="8">登记信息</van-col>
      <van-col span="8">发现</van-col>
      <van-col span="8">我的</van-col>
    </van-row>
  </section>
</template>
<script>
import { Row, Col } from 'vant'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
}
</script>
<style lang="scss" scoped>
</style>
