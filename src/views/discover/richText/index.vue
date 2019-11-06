/* eslint-disable no-tabs */
<!--
 * @Author: your name
 * @Date: 2019-10-22 22:12:01
 * @LastEditTime: 2019-11-06 23:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/discover/discover.vue
 -->
<template>
  <div class="box-warpper">
    <van-nav-bar v-if="false" :title="title" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div v-html="richText"></div>
  </div>
</template>
<script>
import { NavBar } from 'vant'
import { queryNewsContent } from '@/api/upload.js'
export default {
  components: {
    [NavBar.name]: NavBar

  },
  data: function () {
    return {
      richText: ''
    }
  },
  created () {
    this.initialRichText()
    this.title = this.$route.query.title
    // this.richText = `<h1 style='color:red'>这里是富文本内容</h1`
  },
  methods: {
    onClickLeft () {
      // this.$router.go(-1)
    },
    initialRichText () {
      let data = `newsId=${this.$route.query.newsId}`
      queryNewsContent(data).then(
        res => {
          this.richText = res.data.content || '暂无内容'
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.box-warpper {
  height: 100vh;
  font-size: 14px;
  background: #fff;
}
</style>
