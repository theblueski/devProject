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
        placeholder="请输入患儿民族"
        label="患儿名族"
        v-model="formData.nation"
        required
      ></field>
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
        placeholder="请输入患儿父亲职业"
        label="父亲职业"
        v-model="formData.fatherCarrer"
      ></field>
      <field
        placeholder="请输入患儿母亲职业"
        label="母亲职业"
        v-model="formData.fatherCarrer"
      ></field>
    </cell-group>
    <cell-group class="cell-group">
      <up-loader iconTitle="B超结果" size="medium" >
        <div slot="title" class="title-area">
          <span>B超结果</span>
        </div>
      </up-loader>
    </cell-group>
    <cell-group class="cell-group">
      <field label="患侧足"
      required
      >
        <div slot="input"></div>
      </field>
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
        label="开始走路月龄"
        v-model="formData.startWalk"
      ></field>
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
  </div>
</template>

<script>
import { CellGroup, Field } from 'vant'
import upLoader from '@/components/upLoader'
import rules from './rules'
import validator from 'utils/validator'
export default {
  name: 'submitInfo',
  components: {
    CellGroup,
    Field,
    upLoader
    // Picker
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
        mark: ''
      },
      validator: null
    }
  },
  methods: {
    onChange () {
      console.log('change')
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
</style>
