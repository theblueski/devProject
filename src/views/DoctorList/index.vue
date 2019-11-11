<template>
  <div class="doctorList">
    <div class="search-wrapper">
      <search
        v-model="searchStr"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="list-wrapper">
      <cell @click.native="handleClick(item)" v-for="item in showList" :key="item.doctorId" :title="item.name"/>
    </div>
  </div>
</template>
<script>
import { getDoctor } from '@/api/form'
import { Cell, Search } from 'vant'
export default {
  name: 'doctorList',
  components: {
    Cell,
    Search
  },
  data () {
    return {
      originList: [],
      showList: [],
      searchStr: ''
    }
  },
  methods: {
    getDoctorList () {
      getDoctor().then(res => {
        this.originList = this.showList = (res && res.data) || []
      })
    },
    onSearch (str) {
      const reg = new RegExp(str)
      this.showList = this.originList.filter(item => reg.test(item.name))
    },
    onCancel () {
      // this.$router.back()
      let res = window.jumpPre()
      console.log(res)
    },
    handleClick (item) {
      let { doctorId, name } = item
      this.$router.replace({
        path: '/submitInfo',
        query: { doctorId, name }
      })
    }
  },
  created () {
    this.getDoctorList()
  },
  watch: {
    searchStr (val) {
      if (!val) {
        this.showList = this.originList
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .doctorList {
    padding-top: 48px;
  }
  .search-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 300;
  }
</style>
