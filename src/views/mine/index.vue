<!--
 * @Author: your name
 * @Date: 2019-10-27 21:31:05
 * @LastEditTime: 2019-11-10 20:51:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/index.vue
 -->
<template>
  <section class="box-wrapper">
    <div class="user-info">
      <div class="head-portrait">
      <van-image
        class='image-style'
        :src='imageUrl'
        />
      </div>
      <div class="user-name">{{nickname}}</div>
    </div>
    <div class="list">
      <div class="mine-device" @click="goDevice">我的设备</div>
      <div class="mine-case" @click="goCase">我的病例</div>
    </div>
  </section>
</template>
<script>
import { Image } from 'vant'
export default {
  data: function () {
    return {
      imageUrl: '',
      nickname: ''
    }
  },
  components: {
    [Image.name]: Image
  },
  created () {
    // window.document.cookie = 'headimgurl=http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0'
    // window.document.cookie = 'nickname=nihao'
    this.imageUrl = window.getCookie('headimgurl')
    this.nickname = window.getCookie('nickname')
    console.log(this.imageUrl)
  },
  methods: {
    goDevice () {
      this.$router.push({
        name: 'deviceList'
      })
    },
    goCase () {
      this.$router.push({
        name: 'caseDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-wrapper {
  font-size: 12px;
  .user-info {
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    font-size: 14px;
    .head-portrait {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #d6d4d4;
      text-align: center;
      line-height: 60px;
      margin-right: 20px;
      .image-style{
          width:100%;
          height:100%;
          border-radius:50%;
          overflow:hidden;
      }
    }
  }
  .list {
    > div {
      height: 40px;
      padding-left: 10px;
      line-height: 40px;
      border-top: 1px solid #d6d4d4;
    }
    div:last-child {
      border-bottom: 1px solid #d6d4d4;
    }
  }
}
</style>
