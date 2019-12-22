<!--
 * @Author: your name
 * @Date: 2019-10-27 22:13:35
 * @LastEditTime: 2019-10-27 22:15:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/deviceList/index.vue
 -->
<template>
  <collapse v-model="activeNames">
    <collapse-item class="no-padding" :title="title" name="1">
      <router-view></router-view>
    </collapse-item>
    <collapse-item class="no-padding" title="复查信息" name="2">
      <reexamination-item v-for="item in reexaminationList" :key="item.id"  :rItem="item"/>
    </collapse-item>
  </collapse>
</template>
<script>
import { Collapse, CollapseItem } from 'vant'
import { getIllnessCaseList } from '@/api/upload'
import reexaminationItem from './reexaminationItem'
export default {
  components: {
    Collapse,
    CollapseItem,
    reexaminationItem
  },
  data () {
    return {
      activeNames: ['1'],
      reexaminationList: [],
      title: ''
    }
  },
  methods: {
    getReexaminationList () {
      getIllnessCaseList().then(res => {
        this.reexaminationList = res.data.list || []
        if (this.reexaminationList.length > 0) {
          this.title = this.reexaminationList[0].patientName
        }
      })
    }
  },
  created () {
    this.getReexaminationList()
  }
}
</script>
<style lang="scss" scoped>
  .no-padding {
    /deep/ .van-collapse-item__content {
      padding: 0;
    }
  }
</style>
