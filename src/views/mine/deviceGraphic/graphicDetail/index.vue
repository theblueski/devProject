<!--
 * @Author: your name
 * @Date: 2019-10-28 23:20:27
 * @LastEditTime: 2019-11-20 22:29:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/deviceGraphic/graphicDetail/index.vue
 -->
<template>
  <section class="box-wrapper">
    <div class="date-select">
      <div class="date-box">
        <div class="date-label">开始日期</div>
        <div class="date-input">
          <Field
            class="begain-input"
            v-model="begainDate"
            placeholder="请选择日期"
            readonly
            @click="chooseBegainDate('begain')"
          />
        </div>
      </div>
      <div class="date-box">
        <div class="date-label">结束日期</div>
        <div class="date-input">
          <Field
            readonly
            class="begain-input"
            v-model="endDate"
            placeholder="请选择日期"
            @click="chooseBegainDate('end')"
          />
        </div>
      </div>
      <div class="btn-search">
        <van-button type="info" size="small" @click="getTableList">查询</van-button>
      </div>
    </div>
    <div class="device-list">
      <deviceListTable :deviceList="deviceListData" :radio="currentRadio" @select="onSelect"></deviceListTable>
    </div>
    <div class="device-table-data">
      <list>
        <div class="div-row">
          <div class="list-line-layout">日期</div>
          <div class="list-line-layout">后跟穿戴时长(h)</div>
          <div class="list-line-layout">前足穿戴时长(h)</div>
        </div>
        <div v-if="deviceData.length">
          <div class="div-row" v-for="(item,index) in deviceData" :key="index">
            <div>{{item.date}}</div>
            <div>{{item.doubleHours}}</div>
            <div>{{item.behindEffectiveHours}}</div>
          </div>
        </div>
        <div class="no-data" v-else>暂无数据</div>
      </list>
    </div>
    <div class="box-picker" v-if="false">
      <datetime-picker
        size="small"
        v-model="currentDate"
        type="date"
        v-if="showDate && false"
        :border="true"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </div>
    <pop-date-picker :date="currentDate" :showPicker.sync="showDate" @confirm="onConfirm" />
  </section>
</template>
<script>
import { DatetimePicker, Field, Button, List } from 'vant'
import deviceListTable from '@/components/graphicDetail/deviceList'
import { formatDate } from '@/utils/format'
import { deviceList, deviceGraphicData } from '@/api/upload.js'
import popDatePicker from '@/components/popDatePicker'
import { getToken } from '@/utils/auth'
export default {
  components: {
    DatetimePicker,
    Field,
    [Button.name]: Button,
    deviceListTable,
    List,
    popDatePicker
  },
  data: function () {
    return {
      currentDate: new Date(),
      dateType: '', // begain end
      begainDate: '',
      endDate: '',
      showDate: false,
      showEndDate: false,
      deviceListData: [],
      deviceData: [],
      currentRadio: 1,
      currentDeviceId: ''
    }
  },
  created () {
    // for (var i = 0; i < 30; i++) {
    //   this.deviceData.push({
    //     date: '2019-09-21',
    //     frontTime: '12',
    //     endTime: '2'

    //   })
    // }
    this.initialData()
  },
  methods: {
    initialData () {
      // 显示选中起止时间
      this.begainDate = this.$route.query.startDate
      this.endDate = this.$route.query.endDate
      this.currentDeviceId = this.$route.query.deviceId
      this.getDeviceList()

      // 选中设备id
      // 获取数据
    },
    getDeviceList () {
      let data = `unionid=${getToken()}`
      deviceList(data).then(
        (res) => {
          let arr = res.data
          arr.forEach((item, index) => {
            item.deviceName = '设备' + (index + 1)
            item.radioNo = index + 1
            if (item.deviceId === this.$route.query.deviceId) {
              this.currentRadio = index + 1
            }
          })
          arr.push({
            deviceName: '汇总', bindTime: '', deviceId: '', radioNo: 0
          })
          this.deviceListData = arr
          this.getTableList()
        }
      )
    },
    chooseBegainDate (type) {
      this.showDate = true
      this.dateType = type
      this.currentDate = type === 'begain' ? new Date(this.begainDate) : new Date(this.endDate)
    },
    onConfirm (value) {
      let date = formatDate(value)
      this.showDate = false
      if (this.dateType === 'begain') {
        this.begainDate = date
      } else {
        this.endDate = date
      }
    },
    onSelect (name) {
      this.currentRadio = name
      if (name === 0) {
        this.currentDeviceId = ''
      } else {
        this.currentDeviceId = this.deviceListData[name - 1].deviceId
      }
    },
    getTableList () {
      let data = ''
      if (!this.currentDeviceId) {
        data = `startDate=${this.begainDate}&endDate=${this.endDate}&unionid=${getToken()}`
      } else {
        data = `startDate=${this.begainDate}&endDate=${this.endDate}&unionid=${getToken()}&deviceId=${this.deviceListData[this.currentRadio - 1].deviceId}`
      }
      deviceGraphicData(data).then(res => {
        this.deviceData = res.data.list
      })
    },
    onCancel () {
      this.showDate = false
    }
  }

}
</script>
<style lang="scss" scoped>
.box-wrapper {
  overflow-y: auto;
  .box-picker {
    position: absolute;
    bottom: 0;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column-reverse;
    background: rgba(0, 0, 0, 0.5);
  }
  .device-list {
    border-bottom: 10px solid #f2f2f2;
  }
  .device-table-data {
    .div-row {
      display: flex;
      flex-direction: row;
      align-content: left;
      align-items: center;
      padding: 0 20px;
      & > div {
        flex: 1;
        height: 31px;
        line-height: 31px;
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
  .no-data {
    text-align: center;
    padding: 40px;
  }
}
.begain-input {
  border: 1px solid #cccbcb;
  width: 90;
}
.date-select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 10px solid #f2f2f2;
  padding: 20px;
  > .date-box {
    flex: 1;
  }
  .date-input {
    width: 90%;
  }
  .begain-input {
    padding-left: 4px;
  }
  .btn-search {
    text-align: right;
  }
  .date-label {
    padding-bottom: 6px;
  }
}
</style>
<style>
.begain-input.van-cell {
  padding: 0;
}
</style>
