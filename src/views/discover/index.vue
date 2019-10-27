<!--
 * @Author: your name
 * @Date: 2019-10-22 22:12:01
 * @LastEditTime: 2019-10-27 21:23:19
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
            <div class="date">{{item.date}}</div>
          </div>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
import { NavBar, List } from 'vant'
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
      let arr = [
        {
          title: '新闻标题',
          date: '2019-10-21 19:00'
        }
      ]
      setTimeout(() => {
        this.list = arr
        for (let i = 0; i < 10; i++) {
          this.list.push({
            title: '新闻标题',
            date: '2019-10-21 19:00'
          })
        }
        this.loading = false

        if (this.list.length >= 11) {
          this.finished = true
        }
      }, 100)
      console.log(3)
    },
    goDetail (item) {
      this.$router.push({
        name: 'richPage',
        query: {
          title: '养身'
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
