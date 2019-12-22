<template>
  <div class="upload-wrapper">
    <div class="title">
      <slot name="title" :count="count"></slot>
    </div>
    <div class="content-area">
      <div v-for="(item,index) in picList" :key="index" class="img-item has-border" :class="[size]" @click="popDetail(item)">
        <img :src="item" alt="">
        <div v-if='!disable' class="del-area"  @click.self.stop="removePic(index)">删除</div>
      </div>
      <div class="img-item has-border select-wrapper" :class="[size]" v-if="picList.length < limit && !disable">
        <input type="file" class="file-select" @change="fileChange" accept="image/jpg,image/jpeg,image/png,image/PNG">
        <div class="show-area">
          <svg-icon icon-class="camera"  class="camera-class"/>
          <p class="icon-title">{{iconTitle}}</p>
        </div>
      </div>
    </div>
    <slot></slot>
    <img-preview :showDetail.sync="showDetail" :imgSrc="curPic"/>
  </div>
</template>

<script>
import imgPreview from '@/components/imgPreview'
import { uploadImage } from '@/api/upload'

export default {
  name: 'upLoader',
  components: {
    imgPreview
  },
  props: {
    iconTitle: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    maxWidth: {
      type: Number,
      default: 900
    },
    maxHeight: {
      type: Number,
      default: 900
    },
    limit: {
      type: Number,
      default: 4
    },
    value: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      picList: [],
      curPic: '',
      showDetail: false
    }
  },
  methods: {
    removePic (index) {
      for (let i = 0; i < this.picList.length; i++) {
        if (index === i) {
          this.picList.splice(i, 1)
          this.$emit('update:value', this.picList.join(','))
          break
        }
      }
    },
    popDetail (src) {
      this.curPic = src
      this.showDetail = true
    },
    fileChange (e) {
      const _this = this
      const file = e.target.files[0]
      const fileName = file.name
      const reader = new FileReader()
      const image = new Image()
      reader.onload = e => {
        image.src = e.target.result
      }
      image.onload = function () {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        // 原始尺寸
        const originWidth = this.width
        const originHeight = this.height

        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight

        if (originWidth > _this.maxWidth || originHeight > _this.maxHeight) {
          if (originWidth / originHeight > _this.maxWidth / _this.maxHeight) {
            targetWidth = _this.maxWidth
            targetHeight = Math.round(_this.maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = _this.maxHeight
            targetWidth = Math.round(_this.maxHeight * (originWidth / originHeight))
          }
        }

        canvas.width = targetWidth
        canvas.height = targetHeight

        context.clearRect(0, 0, targetWidth, targetHeight)
        context.drawImage(image, 0, 0, targetWidth, targetHeight)

        const newUrl = canvas.toDataURL('image/jpeg', 0.92)
        _this.doUpload(newUrl, fileName)
      }
      reader.readAsDataURL(file)
    },
    doUpload (url, fileName) {
      const blob = this.dataURItoBlob(url)
      const fd = new FormData()
      fd.append('file', blob, fileName)
      uploadImage(fd).then(res => {
        const url = ((res && res.data) || '').split(',')[0]
        this.picList.push(url)
        this.$emit('update:value', this.picList.join(','))
      })
    },
    dataURItoBlob (dataURI) {
      let byteString = atob(dataURI.split(',')[1])
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    }
  },
  computed: {
    count () {
      return this.picList.length
    }
  },
  created () {
    if (this.value) {
      this.picList = this.value.split(',')
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.picList = val.split(',')
      } else {
        this.picList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 14px;
    line-height: 40px;
  }
  .upload-wrapper {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
  }

  .content-area {
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
    }
    &>.small {
      width: 60px;
      height: 60px;
      .icon-title {
        margin-top: 5px;
      }
    }
    &>.medium {
      width: 80px;
      height: 80px;
    }

    &>.large {
      width: 100px;
      height: 100px;
    }
  }
  .img-item {
    position: relative;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .has-border {
    border: 1px solid #333;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .file-select {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      opacity: 0;
    }
  }

  .icon-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }

  .cross-icon {
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 12px;
    color: red;
  }

  .del-area {
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    background: rgba(0,0,0,0.8);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 24px;
    text-align: center;
  }

  .camera-class {
    text-align: center;
  }
  .show-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
