<template>
  <div class="form-wrapper">
    <cell-group title="登记基本信息" class="cell-group">
      <field
        placeholder="请输入患儿真实姓名"
        label="患儿姓名"
        v-model="formData.name"
        required
      ></field>
      <field
        label="患儿性别"
        required
      >
        <radio-group slot="input" v-model="formData.gender">
          <radio name="0">女</radio>
          <radio name="1">男</radio>
        </radio-group>
      </field>
      <field
        placeholder="请输入患儿民族"
        label="患儿民族"
        v-model="formData.nation"
        required
      ></field>
      <field required readonly clickable label="出生日期" placeholder="年/月/日" :value="formData.birthday" @click="openDatePicker('birthday')"
      />
      <field readonly clickable label="母亲祖籍" placeholder="省/市" :value="formData.area" @click="chooseProv('area')"
      />
      <field readonly clickable label="患儿出生地" placeholder="省/市" :value="formData.birthPlace" @click="chooseProv('birthPlace')"
      />
      <field
        placeholder="请输入您的手机号码"
        label="联系方式"
        v-model="formData.phone"
        required
      ></field>
      <field
        placeholder="请选择医生信息"
        label="医生信息"
        v-model="formData.doctor"
        required
        disabled
        @click.native="chooseDoctor"
      ></field>
      <field
        label="双胞胎"
        required
      >
        <radio-group slot="input" v-model="formData.twins">
          <radio name="0">否</radio>
          <radio name="1">是</radio>
        </radio-group>
      </field>
      <field
        label="家族史"
        required
      >
        <radio-group slot="input" v-model="formData.heredity">
          <radio name="0">否</radio>
          <radio name="1">是</radio>
        </radio-group>
      </field>
      <field
        label="孕期病症"
      >
        <checkbox-group slot="input" v-model="formData.pregnancyMalady">
          <checkbox name="1">高血压</checkbox>
          <checkbox name="2">高血糖</checkbox>
          <checkbox name="3">贫血</checkbox>
          <checkbox name="4">糖尿病</checkbox>
          <checkbox name="5">其他</checkbox>
        </checkbox-group>
      </field>
      <field
        label="生活习惯"
      >
        <checkbox-group slot="input" v-model="formData.habits">
          <checkbox name="1">抽烟</checkbox>
          <checkbox name="2">喝酒</checkbox>
          <checkbox name="3">常熬夜</checkbox>
        </checkbox-group>
      </field>
      <field
        placeholder="请输入患儿父亲职业"
        label="父亲职业"
        v-model="formData.fatherOccupation"
      ></field>
      <field
        placeholder="请输入患儿母亲职业"
        label="母亲职业"
        v-model="formData.motherOccupation"
      ></field>
      <field readonly clickable label="产前判断" :value="formData.prenatalJudgment" @click="openPicker('prenatalJudgment')"
      />
    </cell-group>
    <cell-group class="cell-group">
      <up-loader :value.sync="formData.ultrasoundResult" iconTitle="B超结果" size="medium" :limit="1">
        <div slot="title" class="title-area">
          <span>B超结果</span>
        </div>
      </up-loader>
    </cell-group>
    <cell-group class="cell-group">
      <field required readonly clickable label="患侧足" :value="formData.foot" @click="openPicker('foot')"
      />
    </cell-group>
    <cell-group class="cell-group">
      <up-loader :value.sync="formData.footPicture" iconTitle="患足图片">
        <template v-slot:title="{count}">
          <div class="title-area">
            <span>治疗前患足图片</span>
            <span>({{count}}/4)</span>
          </div>
        </template>
      </up-loader>
    </cell-group>
    <cell-group  class="cell-group">
      <field required readonly clickable label="开始治疗时间" placeholder="年/月/日" :value="formData.startTreatDate" @click="openDatePicker('startTreatDate')"
      />
      <field readonly clickable label="开始穿鞋时间" placeholder="年/月/日" :value="formData.startShoeDate" @click="openDatePicker('startShoeDate')"
      />
      <field
        placeholder="术前石膏次数"
        label="术前石膏次数"
        v-model="formData.castsTimes"
        required
      ></field>
      <field
        placeholder="术后石膏次数"
        label="术后石膏次数"
        v-model="formData.castsAfterTimes"
      ></field>
      <field
        label="是否跟腱手术"
        required
      >
        <radio-group slot="input" v-model="formData.surgeryTimes">
          <radio name="1">是</radio>
          <radio name="0">否</radio>
        </radio-group>
      </field>
      <field
        label="开始走路月龄"
        v-model="formData.startWalkMonths"
      ></field>
      <field required readonly clickable label="支具类型" :value="formData.type" @click="openPicker('type')"
      />
      <field
        placeholder="如患足60-70度，健足30-40度"
        label="左侧支具角度"
        v-model="formData.badfootAngle"
      ></field>
      <field
        placeholder="如患足60-70度，健足30-40度"
        label="右侧支具角度"
        v-model="formData.goodfootAngle"
      ></field>
      <field
        placeholder="备注"
        label="备注"
        v-model="formData.remark"
        maxlength="50"
        type="textarea"
        rows="2"
        autosize
        show-word-limit
      ></field>
    </cell-group>
    <div class="submit" @click="doSubmit">提交</div>
    <pop-picker :field="field" :showPicker.sync="showPicker" :columns="currentOptions" @confirm="onConfirm"/>
    <pop-date-picker :date="seledDate" :dType="dateType" :field="dateField" :showPicker.sync="showDatePicker" @confirm="onDateConfirm"/>
    <provin-select :showProv.sync="showProv" @select="onProvSelec" :seledValue="defaultSeleProv"/>
  </div>
</template>

<script>
import { CellGroup, Field, RadioGroup, Radio, Checkbox, CheckboxGroup } from 'vant'
import upLoader from '@/components/upLoader'
import popPicker from '@/components/popPicker'
import popDatePicker from '@/components/popDatePicker'
import rules from './rules'
import validator from 'utils/validator'
import { submitPatient } from '@/api/form'  // eslint-disable-line
import ProvinSelect from '@/components/ProvinSelect'
import { getToken } from 'utils/auth'
export default {
  name: 'submitInfo',
  components: {
    CellGroup,
    Field,
    upLoader,
    popPicker,
    popDatePicker,
    RadioGroup,
    Radio,
    Checkbox,
    CheckboxGroup,
    ProvinSelect
  },
  data () {
    return {
      showProv: false,
      formData: {
        name: '',
        gender: 0,
        nation: '',
        area: '',
        birthPlace: '',
        phone: '',
        doctor: '',
        doctorId: '',
        twins: 0,
        heredity: 0,
        pregnancyMalady: [],
        habits: [],
        startWalk: 0,
        fatherOccupation: '',
        motherOccupation: '',
        prenatalJudgment: 'B超',
        ultrasoundResult: '',
        foot: '左侧',
        type: '小白支具',
        footPicture: '',
        startTreatDate: undefined,
        startShoeDate: undefined,
        castsTimes: 0,
        castsAfterTimes: 0,
        surgeryTimes: 0,
        startWalkMonths: 0,
        badfootAngle: '',
        goodfootAngle: '',
        remark: '',
        areaCode: '',
        birthPlaceCode: ''
      },
      footOptions: [{ text: '左侧', id: 1 }, { text: '右侧', id: 2 }, { text: '双侧', id: 3 }],
      footMap: { 1: '左侧', 2: '右侧', 3: '双侧' },
      typeOptions: [{ text: '小白支具', id: 1 }, { text: 'MD支具', id: 2 }, { text: '塑料支具', id: 3 }, { text: '其他支具', id: 4 }],
      typeMap: { 1: '小白支具', 2: 'MD支具', 3: '塑料支具', 4: '其他支具' },
      prenatalJudgmentOptions: [{ text: 'B超', id: 1 }, { text: '羊水/脐血穿刺', id: 2 }, { text: '无创DNA', id: 3 }],
      prenatalJudgmentMap: { 1: 'B超', 2: '羊水/脐血穿刺', 3: '无创DNA' },
      validator: null,
      showPicker: false,
      showDatePicker: false,
      field: null,
      dateField: null,
      dateType: undefined,
      currentOptions: [],
      extraFormData: {
        prenatalJudgment: 1,
        type: 1,
        foot: 1
      },
      provFlag: null,
      areaDefaultSel: '',
      birthPlaceDefaultSel: '',
      defaultSeleProv: null,
      seledDate: ''
    }
  },
  methods: {
    onProvSelec (data) {
      this.formData[`${this.provFlag}Code`] = data.code
      this.formData[this.provFlag] = data.name
      this.provFlag = null
    },
    chooseProv (tag) {
      this.defaultSeleProv = this[`${tag}DefaultSel`]
      this.showProv = true
      this.provFlag = tag
    },
    chooseDoctor () {
      this.$router.push({
        path: '/doctorList'
      })
    },
    openDatePicker (field, type) {
      if (type) {
        this.dateType = type
      }
      this.dateField = field
      this.seledDate = this.formData[field]
      this.showDatePicker = true
    },
    onDateConfirm (data) {
      this.formData[this.dateField] = data
      this.seledDate = ''
    },
    onConfirm (data) {
      this.formData[this.field] = this[`${this.field}Map`][data.id]
      this.extraFormData[this.field] = data.id
    },
    openPicker (field) {
      this.field = field
      this.currentOptions = this[`${field}Options`]
      this.showPicker = true
    },
    fillform (data) {
      data.pregnancyMalady = data.pregnancyMalady.split(',')
      data.habits = data.habits.split(',')
      this.formData = data
      this.extraFormData.prenatalJudgment = data.prenatalJudgment
      this.extraFormData.type = data.type
      this.extraFormData.foot = data.foot
      this.formData.prenatalJudgment = this.prenatalJudgmentMap[data.prenatalJudgment]
      this.formData.type = this.typeMap[data.type]
      this.formData.foot = this.footMap[data.foot]
      this.areaDefaultSel = data.areaCode
      this.birthPlaceDefaultSel = data.birthPlaceCode
    },
    doSubmit () {
      this.validator.validate((errors, fields) => {
        if (fields && fields.length > 0) {
          this.$toast(fields[0].message)
        } else {
          let params = { ...this.formData, ...this.extraFormData }
          params.pregnancyMalady = params.pregnancyMalady.join(',')
          params.habits = params.habits.join(',')
          params.openId = getToken() || '123456'
          submitPatient(params).then(res => {
            console.log(res)
          })
        }
      })
    }
  },
  created () {
    this.validator = validator(rules, this.formData)
  },
  activated () {
    const { name, doctorId } = this.$store.state.doctorInfo
    this.formData.doctorId = doctorId
    this.formData.doctor = name
  },
  watch: {
    'formData.startShoeDate': {
      handler (val) {
        console.log(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .submit {
    position: fixed;
    bottom: 80px;
    right: 30px;
    height: 66px;
    width: 66px;
    border-radius: 66px;
    background: #1989fa;
    color: #fff;
    text-align: center;
    line-height: 66px;
    font-size: 20px;
  }
  .cell-group {
    margin-bottom: 10px;
  }

  .form-wrapper /deep/ .van-radio-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .van-radio {
      margin-right: 20px;
    }
  }

  .form-wrapper /deep/ .van-checkbox__icon--round .van-icon {
    border-radius: 0;
  }

  .form-wrapper /deep/ .van-checkbox-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .van-checkbox {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
</style>
