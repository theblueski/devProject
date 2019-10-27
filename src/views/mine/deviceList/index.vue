<!--
 * @Author: your name
 * @Date: 2019-10-27 22:13:35
 * @LastEditTime: 2019-10-27 23:10:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/deviceList/index.vue
 -->
<template>
  <section class="box-wrapper">
    <div v-if="!deviceList.length" class="notice">
      <div>1.打开蓝牙</div>
      <div>2.将设备放置在1米之内</div>
    </div>
    <div class="list">
      <div
        class="mine-device"
        v-for="(item,index) in deviceList"
        :key="index"
        @click="goGraphic(item)"
      >{{item.name}}</div>
    </div>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      deviceList: [{
        name: '设备-01',
        id: 'device-01'
      }, {
        name: '设备-02',
        id: 'device-02'
      }]
    }
  },
  created () {
    // this.deviceList = []
  },
  methods: {
    goGraphic (data) {
      this.$router.push({
        name: 'graphicPage',
        query: {
          id: data.id,
          name: data.name
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-wrapper {
  padding-top: 20px;
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
.notice {
  padding-left: 10px;
  line-height: 20px;
}
</style>
