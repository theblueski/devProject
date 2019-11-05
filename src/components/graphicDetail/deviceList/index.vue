<!--
 * @Author: your name
 * @Date: 2019-10-29 21:46:56
 * @LastEditTime: 2019-11-06 00:09:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/components/graphicDetail/index.vue
 -->
<template>
  <section class="com-container">
    <table v-if="false">
      <thead>
        <tr>
          <th :style="{width:'50px'}">状态</th>
          <th :style="{width:'50px'}">名称</th>
          <th :style="{width:'100px'}">绑定时间</th>
          <th :style="{width:'100px'}">支具编码</th>
        </tr>
      </thead>
      <tbody>
        <radio-group v-model="radio" disabled>
          <tr v-for="(item,index) in deviceList" :key="index">
            <td>
              <radio :name="index+1"></radio>
            </td>
          </tr>
        </radio-group>
      </tbody>
    </table>
    <div class="table-th">
      <div :style="{width:'50px'}">状态</div>
      <div :style="{width:'50px'}">名称</div>
      <div :style="{width:'100px'}">绑定时间</div>
      <div :style="{width:'100px'}">支具编码</div>
    </div>
    <radio-group v-model="currentRadio" @change="radioChange">
      <div>
        <div class="table-td" v-for="(item,index) in deviceList" :key="index">
          <div :style="{width:'50px','padding-top':'6px'}">
            <radio :name="item.radioNo"></radio>
          </div>
          <div :style="{width:'50px'}">{{item.deviceName}}</div>
          <div :style="{width:'100px'}">{{item.bindTime}}</div>
          <div :style="{width:'100px'}">{{item.deviceId}}</div>
        </div>
      </div>
    </radio-group>
  </section>
</template>
<script>
import { RadioGroup, Radio } from 'vant'
export default {
  components: {
    RadioGroup,
    Radio
  },
  props: {
    tableTh: {
      type: Array,
      default: function () {
        return []
      }
    },
    deviceList: {
      type: Array,
      default: function () {
        return [{ deviceName: '支具-01', bindTime: '2019-10-22', deviceId: 'id-238837827' }, { deviceName: '支具-02', bindTime: '2019-10-22', deviceId: 'id-238837827' }, { deviceName: '汇总', date: '', deviceId: '' }]
      }
    },
    radio: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      currentRadio: 1,
      radioTotal: 'total'
      // deviceList: [{ deviceName: '支具-01', date: '2019-10-22', deviceId: 'id-238837827' }, { deviceName: '支具-02', date: '2019-10-22', deviceId: 'id-238837827' }, { deviceName: '汇总', date: '', deviceId: '' }]
    }
  },
  created () {
    this.currentRadio = this.radio
  },
  methods: {
    radioChange (name) {
      this.$emit('select', name)
    }
  },
  watch: {
    radio: function (newVal) {
      this.currentRadio = newVal
    }
  }
}
</script>
<style lang="scss" scoped>
.com-container {
  padding: 0 20px;
  .table-th,
  .table-td {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #f2f2f2;
  }
  .table-td:last-child {
    border-bottom: 1px solid #f2f2f2;
  }
}
</style>
