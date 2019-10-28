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
        <radio-group slot="input" v-model="formData.sex">
          <radio name="1">男</radio>
          <radio name="2">女</radio>
        </radio-group>
      </field>
      <field
        placeholder="请输入患儿民族"
        label="患儿名族"
        v-model="formData.nation"
        required
      ></field>
      <field required readonly clickable label="出生日期" placeholder="年/月/日" :value="formData.birthday" @click="openDatePicker('birthday')"
      />
      <field
        placeholder="请输入您的手机号码"
        label="联系方式"
        v-model="formData.phone"
        required
      ></field>
      <field
        placeholder="请输入医生信息"
        label="医生信息"
        v-model="formData.doctor"
        required
      ></field>
      <field
        label="双胞胎"
        required
      >
        <radio-group slot="input" v-model="formData.isTwin">
          <radio name="1">是</radio>
          <radio name="2">否</radio>
        </radio-group>
      </field>
      <field
        label="家族史"
        required
      >
        <radio-group slot="input" v-model="formData.fromParent">
          <radio name="1">是</radio>
          <radio name="2">否</radio>
        </radio-group>
      </field>
      <field
        label="孕期病症"
      >
        <checkbox-group slot="input" v-model="formData.binzheng">
          <checkbox name="a">高血压</checkbox>
          <checkbox name="b">高血糖</checkbox>
          <checkbox name="c">贫血</checkbox>
          <checkbox name="c">糖尿病</checkbox>
          <checkbox name="c">其他</checkbox>
        </checkbox-group>
      </field>
      <field
        label="生活习惯"
      >
        <checkbox-group slot="input" v-model="formData.hobby">
          <checkbox name="a">抽烟</checkbox>
          <checkbox name="b">喝酒</checkbox>
          <checkbox name="c">常熬夜</checkbox>
        </checkbox-group>
      </field>
      <field
        placeholder="请输入患儿父亲职业"
        label="父亲职业"
        v-model="formData.fatherCarrer"
      ></field>
      <field
        placeholder="请输入患儿母亲职业"
        label="母亲职业"
        v-model="formData.fatherCarrer"
      ></field>
      <field readonly clickable label="产前判断" :value="formData.asertType" @click="openPicker('asertType')"
      />
    </cell-group>
    <cell-group class="cell-group">
      <up-loader iconTitle="B超结果" size="medium" >
        <div slot="title" class="title-area">
          <span>B超结果</span>
        </div>
      </up-loader>
    </cell-group>
    <cell-group class="cell-group">
      <field required readonly clickable label="患侧足" :value="formData.sickSide" @click="openPicker('sickSide')"
      />
    </cell-group>
    <cell-group class="cell-group">
      <up-loader iconTitle="患足图片">
        <template v-slot:title="{count}">
          <div class="title-area">
            <span>治疗前患足图片</span>
            <span>({{count}}/4)</span>
          </div>
        </template>
      </up-loader>
    </cell-group>
    <cell-group  class="cell-group">
      <field required readonly clickable label="开始治疗时间" placeholder="年/月/日" :value="formData.startCure" @click="openDatePicker('startCure')"
      />
      <field readonly clickable label="开始穿鞋时间" placeholder="年/月/日" :value="formData.shoeTime" @click="openDatePicker('shoeTime')"
      />
      <field
        placeholder="术前石膏次数"
        label="术前石膏次数"
        v-model="formData.beforeDeal"
        required
      ></field>
      <field
        placeholder="术后石膏次数"
        label="术后石膏次数"
        v-model="formData.afterDeal"
      ></field>
      <field
        label="是否跟腱手术"
        required
      >
        <radio-group slot="input" v-model="formData.genjian">
          <radio name="1">是</radio>
          <radio name="2">否</radio>
        </radio-group>
      </field>
      <field
        label="开始走路月龄"
        v-model="formData.startWalk"
      ></field>
      <field required readonly clickable label="支具类型" :value="formData.utilType" @click="openPicker('utilType')"
      />
      <field
        placeholder="如患足60-70度，健足30-40度"
        label="左侧支具角度"
        v-model="formData.leftAngle"
      ></field>
      <field
        placeholder="如患足60-70度，健足30-40度"
        label="右侧支具角度"
        v-model="formData.rightAngle"
      ></field>
      <field
        placeholder="备注"
        label="备注"
        v-model="formData.mark"
        maxlength="50"
        type="textarea"
        rows="2"
        autosize
        show-word-limit
      ></field>
    </cell-group>
    <div class="submit" @click="doSubmit">提交</div>
    <pop-picker :field="field" :showPicker.sync="showPicker" :columns="currentOptions" @confirm="onConfirm"/>
    <pop-date-picker :dType="dateType" :field="dateField" :showPicker.sync="showDatePicker" @confirm="onDateConfirm"/>
  </div>
</template>

<script>
import { CellGroup, Field, RadioGroup, Radio, Checkbox, CheckboxGroup } from 'vant'
import upLoader from '@/components/upLoader'
import popPicker from '@/components/popPicker'
import popDatePicker from '@/components/popDatePicker'
import rules from './rules'
import validator from 'utils/validator'
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
    CheckboxGroup
  },
  data () {
    return {
      formData: {
        name: '',
        nation: '',
        phone: '',
        doctor: '',
        startWalk: 0,
        beforeDeal: '',
        mark: '',
        sickSide: '双侧',
        utilType: '小白支具',
        asertType: 'B超'
      },
      sickSideOptions: ['双侧', '左侧', '右侧'],
      utilTypeOptions: ['小白支具', '双侧支具', '小黑支具'],
      asertTypeOptions: ['B超', 'Ct'],
      validator: null,
      showPicker: false,
      showDatePicker: false,
      field: null,
      dateField: null,
      dateType: undefined,
      currentOptions: []
    }
  },
  methods: {
    openDatePicker (field, type) {
      if (type) {
        this.dateType = type
      }
      this.dateField = field
      this.showDatePicker = true
    },
    onDateConfirm (data) {
      this.formData[this.dateField] = data
    },
    onConfirm (data) {
      this.formData[this.field] = data[0]
    },
    openPicker (field) {
      this.field = field
      this.currentOptions = this[`${field}Options`]
      this.showPicker = true
    },
    doSubmit () {
      this.doValidate()
    },
    doValidate () {
      this.validator.validate((errors, fields) => {
        console.log(errors)
        if (fields && fields.length > 0) {
          this.$toast(fields[0].message)
        }
      })
    }
  },
  created () {
    this.validator = validator(rules, this.formData)
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
