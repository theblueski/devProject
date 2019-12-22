<template>
  <div class="cell-wrapper">
    <my-row class="cell-style">
      <my-col :span="labelWidth" class="custom-cell-head">
        {{title}}
      </my-col>
      <my-col :span="24-labelWidth">
        <slot></slot>
      </my-col>

    </my-row>
  </div>
</template>
<script>
import { Row, Col } from 'vant'
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    myRow: Row,
    myCol: Col
  },
  data () {
    return {
      labelWidth: 8
    }
  }
}
</script>
<style lang="scss" scoped>
  .custom-cell-head {
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
  }
  .cell-style {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
  }
</style>
