<!--
 * @Author: your name
 * @Date: 2019-10-27 23:11:03
 * @LastEditTime: 2019-10-28 23:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/mine/deviceGraphic/index.vue
 -->
<template>
  <section class="box-wrapper">
    <div class="period-use">你已经累穿戴智能支具{{totalDays}}天</div>
    <div class="active-period">最近{{periodDays}}天的穿戴记录</div>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      totalDays: 73,
      periodDays: 7
    }
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
}
</style>
