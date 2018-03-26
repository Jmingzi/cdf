export const menu = [
  { title: '首页', id: 0, icon: 'el-icon-menu', componentName: 'Home' },
  { title: '组织架构', id: 1, icon: 'el-icon-star-off', componentName: 'DeptUser' },
  { title: '岗位管理', id: 5, icon: 'el-icon-document', componentName: 'Job' },
  { title: '公告管理', id: 2, icon: 'el-icon-bell', componentName: 'Annous' },
  { title: '财务系统', id: 3, icon: 'el-icon-printer', componentName: 'MoneySystem' },
  { title: '推广报销', id: 6, icon: 'el-icon-rank', componentName: 'SpreadExpense' },
  { title: '权限设置', id: 4, icon: 'el-icon-setting', componentName: 'Priv' }
]

export const contactPriv = [
  { title: '操作员工', id: 0, componentName: 'user' },
  { title: '操作部门', id: 1, componentName: 'dept' },
  { title: '导入通讯录', id: 2, componentName: 'import' },
  // { title: '岗位管理', id: 3, componentName: 'job' }
]

export const PAY_TYPE = [
  { label: '办公室支出', value: '1', children: [
      { label: '办公室耗材', value: '1' },
      { label: '通讯费用（话费、手机卡等）', value: '2' },
      { label: '水电', value: '3' },
      { label: '房租', value: '4' },
      { label: '文化建设（装修、绿植、文化宣传）', value: '5' },
      { label: '固定资产（桌椅、冰箱、微波炉等）', value: '6' },
    ] },
  { label: '人事支出', value: '2', children: [
      { label: '工资', value: '1' },
      { label: '奖金', value: '2' },
      { label: '招聘', value: '3' },
      { label: '员工福利', value: '4' },
      { label: '差旅费', value: '5' },
      { label: '文化活动', value: '6' }
    ] },
  { label: '技术支出', value: '3', children: [
      { label: '第三方平台使用费', value: '1' },
      { label: '插件开发', value: '2' },
      { label: '技术外包', value: '3' }
    ] },
  { label: '宿舍支出', value: '4', children: [
      { label: '房租', value: '1' },
      { label: '水电', value: '2' },
      { label: '固定资产（如床位、洗衣机）', value: '3' }
    ] },
  { label: '硬件设备', value: '5', children: [
      { label: '电脑', value: '1' },
      { label: '手机', value: '2' },
      { label: '路由器', value: '3' },
      { label: '交换机', value: '4' },
      { label: '摄像头', value: '5' },
      { label: '打印机', value: '6' },
      { label: '投影仪', value: '7' },
      { label: '显示器', value: '8' },
      { label: '其他', value: '9' }
    ] },
  { label: '仓储支出', value: '6', children: [
      { label: '退换货', value: '1' },
      { label: '运输费', value: '2' },
      { label: '包装耗材', value: '3' },
      { label: '产品进货', value: '4' }
    ] },
  { label: '品牌建设', value: '7', children: [
      { label: '包装设计（设计、包材、修图等）', value: '1' },
      { label: 'SEO推广费', value: '2' },
      { label: '宣传推广费（宣传册、横幅等）', value: '3' }
    ] }
]

export const PAY_WAY = [
  { label: '支付宝', value: '1' },
  { label: '微信', value: '2' },
  { label: '银行转账', value: '3' },
  { label: '现金', value: '4' }
]

export const PROCESS_TYPE = [
  { label: '普通报销', value: 1 },
  { label: '推广报销', value: 2 }
]

export const SPREAD_PLATE = [
  { label: '360', value: 1 },
  { label: '百度', value: 2 },
  { label: '搜狗', value: 3 }
]

export const SPREAD_PROJECT = [
  { label: '延时', value: 1 },
  { label: '私护', value: 2 },
  { label: '红血丝', value: 3 }
]

export const CONTACT_TYPE = [
  { label: 'QQ', value: 1 },
  { label: '微信', value: 2 }
]

export const BX_STATUS = [
  { label: '发起申请', value: '1', color: 'color-success', icon: 'el-icon-circle-check' },
  { label: '审批中', value: '2', color: 'color-warning', icon: 'el-icon-remove' },
  { label: '已通过', value: '3', color: 'color-success', icon: 'el-icon-circle-check' },
  { label: '已拒绝', value: '4', color: 'color-red', icon: 'el-icon-error' },
  { label: '待打款', value: '5', color: 'color-ccc', icon: 'el-icon-remove' },
  { label: '已完成', value: '6', color: 'color-success', icon: 'el-icon-circle-check' },
  { label: '待审批', value: '7', color: 'color-ccc', icon: 'el-icon-circle-remove' }
]
