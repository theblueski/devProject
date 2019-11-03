<!--
 * @Author: your name
 * @Date: 2019-10-27 23:11:03
 * @LastEditTime: 2019-11-03 16:50:53
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
export default {
  data: function () {
    return {
      totalDays: 73,
      periodDays: 7,
      cycleTime: [{ time: 7, active: true }, { time: 30 }, { time: 90 }, { time: '详情' }],
      lineCharts: null,
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
          data: ['5-13', '5-14', '5-15', '5-16', '5-17', '5-17', '5-17']
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
  mounted () {
    this.$nextTick(() => {
      this.lineCharts = Echarts.init(document.getElementById('lineChart'))
      this.lineCharts.setOption(this.lineOption)
      window.addEventListener('resize', this.handleResize)
    })
  },
  methods: {
    handleResize () {
      this.lineCharts.resize()
    },
    changeLavel (i) {
      if (this.cycleTime[i].active) {
        return
      }
      this.cycleTime.forEach((item, index) => {
        if (i === index) {
          item.active = true
        } else {
          item.active = false
        }
      })
      this.$forceUpdate()
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
