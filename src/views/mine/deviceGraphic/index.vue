<!--
 * @Author: your name
 * @Date: 2019-10-27 23:11:03
 * @LastEditTime: 2019-11-06 00:09:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/deviceGraphic/index.vue
 -->
<template>
  <section class="box-wrapper">
    <div class="period-use">你已经累穿戴智能支具{{totalDays}}天</div>
    <div class="active-period">最近{{periodDays}}天的穿戴记录</div>
    <div id="lineChart" class="chart-container"></div>
    <div class="label-container">
      <div
        v-for="(item,index) in cycleTime"
        :key="index"
        :class="{active:item.active}"
        @click="changeLavel(index)"
      >
        <span v-if="index!== cycleTime.length-1">{{item.time}} 天</span>
        <span v-else>{{item.time}}</span>
      </div>
    </div>
  </section>
</template>
<script>
import Echarts from 'echarts'
import { deviceGraphicDataForId } from '@/api/upload.js'
import { formatDate } from '@/utils/format.js'
export default {
  data: function () {
    return {
      totalDays: 73,
      periodDays: 7,
      cycleTime: [{ time: 7, active: true }, { time: 30 }, { time: 90 }, { time: '详情' }],
      lineCharts: null,
      graphicData: {
        startDate: '2018-12-26',
        endDate: '2019-01-01',
        deviceId: this.$route.query.id || 'F8:36:9B:75:B8:32',
        unionid: 'oYEDb4puZXiJ5kngE-FaTVcN1wuo'
      },
      lineOption: {
        title: {
          //   text: '消费逐月消费趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          selectedMode: 'single',
          data: ['前足穿戴时长', '后足穿戴时长']
        },
        grid: {
          left: '2%',
          right: '12%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: '日期',
          nameLocation: 'end',
          //   nameTextStyle: {
          //     fontSize: 14,
          //     padding: [0, 0, 0, 50]
          //   },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '小时',
          nameLocation: 'end',
          max: 24,
          min: 0,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 10]
          }
        },
        series: [
          {
            name: '前足穿戴时长',
            type: 'line',
            stack: '总量',
            data: [12, 13, 4, 6, 7, 6, 8, 9, 0, 5, 4, 3, 2, 1]
          },
          {
            name: '后足穿戴时长',
            type: 'line',
            stack: '总量',
            data: [12, 13, 4, 6, 7, 6, 8, 9, 0, 5, 4, 3, 2, 1]
          }
        ]
      }
    }
  },
  created () {
    this.formatParams(this.periodDays)
    this.getGraphicData()
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    formatParams (time) {
      let date = new Date()
      let now = formatDate(date)
      let pre = formatDate(date.getTime() - time * 24 * 60 * 60 * 1000)
      this.graphicData.startDate = pre
      this.graphicData.endDate = now
    },
    getGraphicData () {
      let data = `startDate=${this.graphicData['startDate']}&endDate=${this.graphicData['endDate']}&unionid=${this.graphicData['unionid']}&deviceId=${this.graphicData['deviceId']}`
      deviceGraphicDataForId(data).then((res) => {
        this.formatDate(res.data.dataMap)
      })
    },
    // 获取日期数组
    formatDate (dateObj) {
      let arrValBehind = []
      let arrValBefore = []
      let arrKeysBehind = Object.keys(dateObj.behind).sort((a, b) => { return -1 })
      let formatArr = arrKeysBehind.map((item, index) => {
        let valIndex = item.indexOf('-')
        arrValBehind.push(dateObj.behind[item])
        arrValBefore.push(dateObj.before[item])
        return item.slice(valIndex + 1)
      })

      this.lineOption.xAxis.data = formatArr
      this.lineOption.series[0].data = arrValBefore
      this.lineOption.series[1].data = arrValBehind

      this.initialPraphic()
    },
    handleResize () {
      this.lineCharts.resize()
    },
    changeLavel (i) {
      if (this.cycleTime[i].active) {
        return
      }
      this.cycleTime.forEach((item, index) => {
        if (index === 3) {
          this.$router.push({
            name: 'graphicDetail',
            query: {
              startDate: this.graphicData.startDate,
              endDate: this.graphicData.endDate,
              deviceId: this.graphicData.deviceId
            }
          })
        }
        if (i === index) {
          item.active = true
          this.periodDays = item.time
          this.formatParams(this.periodDays)
          this.getGraphicData()
        } else {
          item.active = false
        }
      })
      this.$forceUpdate()
    },
    initialPraphic () {
      this.lineCharts = Echarts.init(document.getElementById('lineChart'))
      this.lineCharts.setOption(this.lineOption)
      window.addEventListener('resize', this.handleResize)
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    this.lineCharts.dispose()
  }
}
</script>
<style lang="scss" scoped>
.box-wrapper {
  .period-use {
    font-size: 16px;
    color: #c74747;
    text-align: center;
    padding: 20px 0;
  }
  .active-period {
    font-size: 12px;
    color: #3199cc;
    text-align: center;
  }
  .chart-container {
    border-radius: 4px;
    height: 400px;
    background: #fff;
    padding: 20px;
  }
  .label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    > div {
      width: 30px;
      background: #ddd8f0;
      margin-right: 5px;
      text-align: center;
      border-radius: 50%;
      padding: 4px 3px;
    }
    .active {
      background: #3199cc;
      color: #fff;
    }
  }
}
</style>
