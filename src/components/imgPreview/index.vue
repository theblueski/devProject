<template>
  <popup v-model="showPop" style="width:90%">
    <img :src="imgSrc" alt="加载失败" class="img-class">
  </popup>
</template>

<script>
import { Popup } from 'vant'
export default {
  name: 'imgPreview',
  components: {
    Popup
  },
  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPop: false
    }
  },
  watch: {
    showDetail (val) {
      this.showPop = val
    },
    showPop (val) {
      this.$emit('update:showDetail', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-class {
    width: 100%;
  }
</style>
