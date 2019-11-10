<!--
 * @Author: your name
 * @Date: 2019-10-28 22:49:43
 * @LastEditTime: 2019-11-10 20:03:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/components/popDatePicker/index.vue
 -->
<template>
  <popup v-model="show" position="bottom">
    <datetime-picker v-model="currentDate" :type="dType" @cancel="show = false" @confirm="onConfirm" />
  </popup>
</template>

<script>
import { Popup, DatetimePicker } from 'vant'
import { formatDate } from 'utils/format'
export default {
  name: 'popDatePicker',
  components: {
    Popup,
    DatetimePicker
  },
  data () {
    return {
      show: false,
      currentDate: new Date()
    }
  },
  props: {
    showPicker: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: ''
    },
    dType: {
      type: String,
      default: 'date'
    },
    date: {
      default: ''
    }
  },
  methods: {
    onConfirm (value) {
      this.show = false
      let date = formatDate(value)
      this.$emit('confirm', date)
    }
  },
  watch: {
    show (val) {
      this.$emit('update:showPicker', val)
    },
    showPicker (val) {
      this.show = val
    },
    date (newVal, oldVal) {
      this.currentDate = new Date(newVal)
    }
  }
}
</script>
