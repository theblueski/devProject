<template>
  <div class="reexaminationWrapper">
    <cell-group style="marginBottom: 10px">
      <cell title="选择患者">{{illDetail.patientName}}</cell>
      <cell title="复查日期">{{illDetail.visitDay}}</cell>
      <cell title="治疗阶段">{{illDetail.treatmentStageStr}}</cell>
      <cell title="支具穿戴正确性">{{illDetail.wearCorrectStr}}</cell>
      <cell title="穿支具依从性">{{illDetail.wearDependenceStr}}</cell>
      <cell title="选择患者">{{illDetail.afterTreatmentStr}}</cell>
      <cell>
        <my-row>
          <my-col :span="12">左侧脚信息</my-col>
          <my-col :span="12">右侧脚信息</my-col>
        </my-row>
      </cell>
      <cell title="踝部的后褶皱">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftAnkleFold)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightAnkleFold)}}</my-col>
        </my-row>
      </cell>
      <cell title="空足跟">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftEmptyHeel)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightEmptyHeel)}}</my-col>
        </my-row>
      </cell>
      <cell title="僵硬的跖屈">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftStiffPlantarFlexion)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightStiffPlantarFlexion)}}</my-col>
        </my-row>
      </cell>
      <cell title="足底内侧褶皱">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftMedialPlantarFold)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightMedialPlantarFold)}}</my-col>
        </my-row>
      </cell>
      <cell title="距骨头覆盖情况">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftCoverageTalus)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightCoverageTalus)}}</my-col>
        </my-row>
      </cell>
      <cell title="足外侧边弯曲">
        <my-row>
          <my-col :span="12">{{handleAnkleFold(illDetail.leftLateralBendingFoot)}}</my-col>
          <my-col :span="12">{{handleAnkleFold(illDetail.rightLateralBendingFoot)}}</my-col>
        </my-row>
      </cell>
      <cell title="Pirani总分">
        <my-row>
          <my-col :span="12">{{illDetail.leftPiraniScore}}</my-col>
          <my-col :span="12">{{illDetail.rightPiraniScore}}</my-col>
        </my-row>
      </cell>
      <cell title="被动外展">
        <my-row>
          <my-col :span="12">{{illDetail.leftPassiveAbduction === '1' ? '>50' : '50-20'}}</my-col>
          <my-col :span="12">{{illDetail.rightPassiveAbduction === '1' ? '>50' : '50-20'}}</my-col>
        </my-row>
      </cell>
      <cell title="被动背曲">
        <my-row>
          <my-col :span="12">{{illDetail.leftPassiveBackCurve === '1' ?  '>20' : '20-10'}}</my-col>
          <my-col :span="12">{{illDetail.rightPassiveBackCurve === '1' ? '>20' : '20-10'}}</my-col>
        </my-row>
      </cell>
      <cell title="复发情况">
        <my-row>
          <my-col :span="12"> {{handleRelapse(illDetail.leftRelapse)}} </my-col>
          <my-col :span="12"> {{handleRelapse(illDetail.rightRelapse)}} </my-col>
        </my-row>
      </cell>
      <cell title="足长">
        <my-row>
          <my-col :span="12"> {{illDetail.leftFootLength}} </my-col>
          <my-col :span="12"> {{illDetail.rightFootLength}} </my-col>
        </my-row>
      </cell>
      <cell title="支具角度">
        <my-row>
          <my-col :span="12"> {{illDetail.leftBraceAngle}} </my-col>
          <my-col :span="12"> {{illDetail.rightBraceAngle}} </my-col>
        </my-row>
      </cell>
    </cell-group>
    <cell-group style="marginBottom: 10px">
      <p class="group-title">拍X片 ({{photograph.length}}/8)</p>
      <div class="img-wrapper" v-if="photograph.length>0">
        <div class="img-item" v-for="(item,index) in  photograph" :key="index" @click="previewImg(photograph, index)">
          <my-image
            class="img-style"
            fit="cover"
            :src="item"
          />
        </div>
      </div>
    </cell-group>
    <cell-group style="marginBottom: 10px">
      <p class="group-title">患足背曲图片 ({{footBackBendPic.length}}/8)</p>
      <div class="img-wrapper" v-if="footBackBendPic.length > 0">
        <div class="img-item" v-for="(item,index) in  footBackBendPic" :key="index" @click="previewImg(footBackBendPic, index)">
          <my-image
            class="img-style"
            fit="cover"
            :src="item"
          />
        </div>
      </div>
    </cell-group>
    <cell-group style="marginBottom: 10px">
      <p class="group-title">患足外观图片 ({{footAppearancePic.length}}/8)</p>
      <div class="img-wrapper" v-if="footAppearancePic.length > 0">
        <div class="img-item" v-for="(item,index) in  footAppearancePic" :key="index" @click="previewImg(footAppearancePic, index)">
          <my-image
            class="img-style"
            fit="cover"
            :src="item"
          />
        </div>
      </div>
    </cell-group>
    <cell-group style="marginBottom: 10px">
      <p class="group-title">患足穿支具图片 ({{footWearShoePic.length}}/8)</p>
      <div class="img-wrapper" v-if="footWearShoePic.length>0">
        <div class="img-item" v-for="(item,index) in  footWearShoePic" :key="index" @click="previewImg(footWearShoePic, index)">
          <my-image
            class="img-style"
            fit="cover"
            :src="item"
          />
        </div>
      </div>
    </cell-group>
    <cell-group style="marginBottom: 10px">
      <cell title="备注">{{illDetail.description}}</cell>
    </cell-group>
  </div>
</template>
<script>
import customCell from './customCell'
import { CellGroup, Row, Col, Image, ImagePreview } from 'vant'
import { getIllnessCaseDetail } from '@/api/upload'
export default {
  components: {
    cell: customCell,
    CellGroup,
    myRow: Row,
    myCol: Col,
    myImage: Image
  },
  data () {
    return {
      illDetail: {},
      photograph: [],
      footBackBendPic: [],
      footAppearancePic: [],
      footWearShoePic: []
    }
  },
  methods: {
    previewImg (list, index = 1) {
      ImagePreview({
        images: list,
        startPosition: index
      })
    },
    getDetailInfo (id) {
      getIllnessCaseDetail(id).then(res => {
        this.illDetail = res.data || {}
        this.photograph = JSON.parse(this.illDetail.photograph || '') || []
        this.footBackBendPic = JSON.parse(this.illDetail.footBackBendPic || '') || []
        this.footAppearancePic = JSON.parse(this.illDetail.footAppearancePic || '') || []
        this.footWearShoePic = JSON.parse(this.illDetail.footWearShoePic || '') || []
      })
    },
    handleRelapse (data) {
      switch (data) {
        case '1':
          return '高弓'
        case '2':
          return '前足内收'
        case '3':
          return '马蹄'
        case '4':
          return '后跟内翻'
        default:
          return '否'
      }
    },
    handleAnkleFold (data) {
      switch (data) {
        case '1':
          return 0
        case '2':
          return 0.5
        default:
          return 1
      }
    }
  },
  created () {
    const id = this.$route.query.id
    this.getDetailInfo(id)
  }
}
</script>
<style lang="scss" scoped>
  .group-title {
    font-size: 14px;
    padding-left: 16px;
    line-height: 40px;
  }
  .img-wrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 16px;
    .img-item {
      width: 25%;
      margin-bottom: 10px;
      position: relative;
      height: 80px;
      .img-style {
        position: absolute;
        top: 0;
        right: 5px;
        left: 5px;
        bottom: 0;
      }
    }
  }
</style>
