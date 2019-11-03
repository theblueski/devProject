<!--
 * @Author: your name
 * @Date: 2019-10-28 23:20:27
 * @LastEditTime: 2019-11-02 22:57:23
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
            @click="chooseBegainDate('begain')"
          />
        </div>
      </div>
      <div class="date-box">
        <div class="date-label">结束日期</div>
        <div class="date-input">
          <Field
            class="begain-input"
            v-model="endDate"
            placeholder="请选择日期"
            @click="chooseBegainDate('end')"
          />
          <datetime-picker
            size="small"
            v-model="currentDate"
            type="date"
            v-if="showEndDate"
            :border="true"
          />
        </div>
      </div>
      <div class="btn-search">
        <van-button type="info" size="small">查询</van-button>
      </div>
    </div>
    <div class="device-list">
      <deviceList></deviceList>
    </div>
    <div class="device-table-data">
      <list>
        <div class="div-row">
          <div class="list-line-layout">日期</div>
          <div class="list-line-layout">后跟穿戴时长(h)</div>
          <div class="list-line-layout">前足穿戴时长(h)</div>
        </div>
        <div class="div-row" v-for="(item,index) in deviceData" :key="index">
          <div>{{item.date}}</div>
          <div>{{item.frontTime}}</div>
          <div>{{item.endTime}}</div>
        </div>
      </list>
    </div>
    <div class="box-picker">
      <datetime-picker
        size="small"
        v-model="currentDate"
        type="date"
        v-if="showDate"
        :border="true"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </div>
  </section>
</template>
<script>
import { DatetimePicker, Field, Button, List } from 'vant'
import deviceList from '@/components/graphicDetail/deviceList'
export default {
  components: {
    DatetimePicker,
    Field,
    [Button.name]: Button,
    deviceList,
    List

  },
  data: function () {
    return {
      currentDate: new Date(),
      dateType: '', // begain end
      begainDate: '',
      endDate: '',
      showDate: false,
      showEndDate: false,
      deviceData: []
    }
  },
  created () {
    for (var i = 0; i < 30; i++) {
      this.deviceData.push({
        date: '2019-09-21',
        frontTime: '12',
        endTime: '2'

      })
    }
  },
  methods: {
    chooseBegainDate (type) {
      this.showDate = true
      this.dateType = type
      this.currentDate = type === 'begain' ? new Date(this.begainDate) : new Date(this.endDate)
    },
    onConfirm (value) {
      this.showDate = false
      if (this.dateType === 'begain') {
        this.begainDate = value
      } else {
        this.endDate = value
      }
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
    width: 90%;
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
