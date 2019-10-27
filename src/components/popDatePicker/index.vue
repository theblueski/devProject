<template>
  <popup v-model="show" position="bottom">
    <datetime-picker :type="dType" @cancel="show = false" @confirm="onConfirm"/>
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
      show: false
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
    }
  }
}
</script>
