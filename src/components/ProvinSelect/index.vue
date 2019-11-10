<template>
  <popup v-model="show" position="bottom">
    <Area :area-list="areaList" :columns-num="2" :value="selectedArea"
        @cancel="onCancel" @confirm="onConfirm"/>
  </popup>
</template>
<script>
import { Area, Popup } from 'vant'
import areaList from 'assets/area'
export default {
  name: 'provinSelect',
  components: {
    Area,
    Popup
  },
  props: {
    showProv: {
      type: Boolean,
      default: false
    },
    seledValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      areaList,
      selectedArea: null
    }
  },
  methods: {
    onConfirm (area) {
      this.selectedArea = area[1].code
      let strArr = area.map(item => item.name)
      let provStr = strArr.join('-')
      this.$emit('select', { code: area[1].code, name: provStr })
      this.show = false
    },
    onCancel () {
      this.show = false
    }
  },
  watch: {
    show (val) {
      this.$emit('update:showProv', val)
    },
    showProv (val) {
      this.show = val
    },
    seledValue (val) {
      this.selectedArea = val
    }
  }
}
</script>
