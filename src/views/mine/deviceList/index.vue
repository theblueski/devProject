<!--
 * @Author: your name
 * @Date: 2019-10-27 22:13:35
 * @LastEditTime: 2019-11-20 22:24:07
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
      >{{item.deviceId}}</div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { deviceList } from '@/api/upload.js'
import { getToken } from '@/utils/auth'
export default {
  data: function () {
    return {
      deviceList: [],
      showTip: false
    }
  },
  created () {
    // this.deviceList = []
    this.getDeviceList()
    window.sendDataCallback = () => {
      this.getDeviceList()
    }
  },
  methods: {
    getDeviceList () {
      let data = `unionid=${getToken()}`
      deviceList(data).then(res => {
        if (res.code === '200') {
          this.deviceList = res.data
          if (!this.deviceList.length) {
            this.showTip = false
          }
        }
      }, err => {
        this.showTip = false
        console.log(err)
      })
    },
    goGraphic (data) {
      this.$router.push({
        name: 'graphicPage',
        query: {
          id: data.deviceId,
          name: data.name
        }
      })
    }
  },
  computed: {
    ...mapState('bluetooth', {
      bluetoothList: state => state.bluetoothList
    })
  },
  watch: {
    bluetoothList: function (newVal, oldVal) {
      console.log(this.bluetoothList, 'watch')
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
