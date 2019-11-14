<template>
  <popup v-model="show" position="bottom">
    <picker :default-index="defaultSel" show-toolbar :columns="columns" @cancel="show = false" @confirm="onConfirm"/>
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
    },
    defaultSel: {
      default: 0
    }
  },
  methods: {
    onConfirm (data) {
      this.show = false
      this.$emit('confirm', data)
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
