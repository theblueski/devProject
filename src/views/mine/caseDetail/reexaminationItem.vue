<template>
  <collapse v-model="activeNames">
    <collapse-item :title='title' name="1" @click="goDetail">
      <div class="item-style" @click="goDetail">
        <my-row class="row-item">
          <my-col span="24">治疗阶段: {{rItem.treatmentStageStr}} </my-col>
        </my-row>
        <my-row class="row-item">
          <my-col span="24">复查后处理: {{rItem.afterTreatmentStr}}</my-col>
        </my-row>
        <div class="arrow-area">
          <icon name="arrow" />
        </div>
      </div>
    </collapse-item>
  </collapse>
</template>
<script>
import { Collapse, CollapseItem, Row, Col } from 'vant'
export default {
  components: {
    Collapse,
    CollapseItem,
    myRow: Row,
    myCol: Col
  },
  data () {
    return {
      title: '',
      activeNames: []
    }
  },
  methods: {
    goDetail () {
      this.$router.push({
        path: '/reexamination',
        query: {
          id: this.rItem.id
        }
      })
    }
  },
  props: {
    rItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.title = `复查日期: ${this.rItem.visitDay}`
  }
}
</script>
<style lang="scss" scoped>
  .item-style {
    padding: 5px 16px;
    position: relative;
  }
  .row-item {
    font-size: 14px;
  }
  .arrow-area {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
