<!--
 * @Author: your name
 * @Date: 2019-10-22 22:12:01
 * @LastEditTime: 2019-11-06 22:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/views/discover/discover.vue
 -->
<template>
  <div class="box-warpper">
    <van-nav-bar title="发现" v-if="false" />
    <div>
      <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div>
          <div
            v-for="(item,index) in list"
            :key="index"
            class="discover-list"
            @click="goDetail(item)"
          >
            <div class="title">{{item.title}}</div>
            <div class="date">{{item.modifyDate}}</div>
          </div>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
import { NavBar, List } from 'vant'
import { queryNewsList } from '@/api/upload.js'
import { dateFormat } from '@/utils/format.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    List
  },
  data: function () {
    return {
      loading: false,
      finished: false,
      list: [

      ]
    }
  },
  methods: {

    onLoad () {
      this.loading = true
      this.initialList()
    },
    initialList () {
      queryNewsList().then((res) => {
        this.loading = false
        this.finished = true
        let arr = res.data
        arr.forEach((item) => {
          item.modifyDate = dateFormat('YYYY-mm-dd HH:MM', new Date(item.modifyDate))
        })
        this.list = arr
      }, (err) => {
        if (err) {
          this.loading = false
          this.finished = true
        }
      })
    },
    goDetail (item) {
      this.$router.push({
        name: 'richPage',
        query: {
          newsId: item.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-warpper {
  height: 100vh;
  font-size: 14px;
  background: #fff;
  .discover-list {
    border-top: 1px solid #d6d4d4;
    height: 30px;
    padding: 10px;
    .title {
      padding-bottom: 4px;
    }
    .date {
      font-size: 12px;
    }
  }
  .discover-list:last-child {
    border-bottom: 1px solid #d6d4d4;
  }
}
</style>
