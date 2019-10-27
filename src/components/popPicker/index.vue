<template>
  <popup v-model="show" position="bottom">
    <picker show-toolbar :columns="columns" @cancel="show = false" @confirm="onConfirm"/>
  </popup>
</template>

<script>
import { Popup, Picker } from 'vant'
export default {
  name: 'popPicker',
  components: {
    Popup,
    Picker
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
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    field: {
      type: String,
      default: ''
    }
  },
  methods: {
    onConfirm (...args) {
      this.show = false
      this.$emit('confirm', args)
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
