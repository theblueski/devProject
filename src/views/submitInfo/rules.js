export default {
  name: [
    {
      required: true,
      message: '请输入患儿真实姓名'
    }
  ],
  nation: [
    {
      required: true,
      message: '请输入患儿民族'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入您的手机号码'
    }
  ],
  doctor: [
    {
      required: true,
      message: '请输入医生信息'
    }
  ],
  beforeDeal: [
    {
      required: true,
      message: '术前石膏次数'
    }
  ],
  startCure: [
    {
      required: true,
      message: '请选择开始治疗时间'
    }
  ],
  birthday: [
    {
      required: true,
      message: '请选择患儿出生日期'
    }
  ]
}
