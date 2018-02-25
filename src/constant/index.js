export const menu = [
  { title: '首页', id: 0, icon: 'el-icon-menu', componentName: 'Home' },
  { title: '组织架构', id: 1, icon: 'el-icon-star-off', componentName: 'DeptUser' },
  { title: '岗位管理', id: 5, icon: 'el-icon-document', componentName: 'Job' },
  { title: '公告管理', id: 2, icon: 'el-icon-bell', componentName: 'Annous' },
  { title: '财务系统', id: 3, icon: 'el-icon-printer', componentName: 'MoneySystem' },
  { title: '权限设置', id: 4, icon: 'el-icon-setting', componentName: 'Priv' }
]

export const contactPriv = [
  { title: '操作员工', id: 0, componentName: 'user' },
  { title: '操作部门', id: 1, componentName: 'dept' },
  { title: '导入通讯录', id: 2, componentName: 'import' },
  // { title: '岗位管理', id: 3, componentName: 'job' }
]

export const PAY_TYPE = [
  { label: '办公室支出', value: '办公室支出', children: [
      { label: '办公室耗材', value: '办公室耗材' },
      { label: '通讯费用（话费、手机卡等）', value: '通讯费用（话费、手机卡等）' },
      { label: '水电', value: '水电' },
      { label: '房租', value: '房租' },
      { label: '文化建设（装修、绿植、文化宣传）', value: '文化建设（装修、绿植、文化宣传）' },
      { label: '固件（桌椅、冰箱、微波炉等）', value: '固件（桌椅、冰箱、微波炉等）' },
    ] },
  { label: '人事支出', value: '人事支出', children: [
      { label: '工资', value: '工资' },
      { label: '奖金', value: '奖金' },
      { label: '招聘', value: '招聘' },
      { label: '员工福利', value: '员工福利' },
      { label: '差旅费', value: '差旅费' },
      { label: '文化活动', value: '文化活动' }
    ] },
  { label: '技术支出', value: '技术支出', children: [
      { label: '第三方平台使用费', value: '第三方平台使用费' },
      { label: '插件开发', value: '插件开发' },
      { label: '技术外包', value: '技术外包' }
    ] },
  { label: '宿舍支出', value: '宿舍支出', children: [
      { label: '房租', value: '房租' },
      { label: '水电', value: '水电' },
      { label: '固件（如床位、洗衣机）', value: '固件（如床位、洗衣机）' }
    ] },
  { label: '硬件设备', value: '硬件设备', children: [
      { label: '电脑', value: '电脑' },
      { label: '手机', value: '手机' },
      { label: '路由器', value: '路由器' },
      { label: '交换机', value: '交换机' },
      { label: '摄像头', value: '摄像头' },
      { label: '打印机', value: '打印机' },
      { label: '投影仪', value: '投影仪' }
    ] },
  { label: '仓储支出', value: '仓储支出', children: [
      { label: '退换货', value: '退换货' },
      { label: '运输费', value: '运输费' },
      { label: '包装耗材', value: '包装耗材' },
      { label: '产品进货', value: '产品进货' }
    ] },
  { label: '品牌建设', value: '品牌建设', children: [
      { label: '包装设计（设计、包材、修图等）', value: '包装设计（设计、包材、修图等）' },
      { label: 'SEO推广费', value: 'SEO推广费' },
      { label: '宣传推广费（宣传册、横幅等）', value: '宣传推广费（宣传册、横幅等）' }
    ] }
]

export const PAY_WAY = [
  { label: '支付宝', value: '支付宝' },
  { label: '微信', value: '微信' },
  { label: '银行转账', value: '银行转账' },
  { label: '现金', value: '现金' }
]
