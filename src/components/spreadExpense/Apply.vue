<template>
  <div class="money-apply">
    <div class="px-margin-b20" v-if="!hasSetProcess && processData.id !== undefined">
      <el-alert
        title="提示"
        type="error"
        description="当前部门还未设置对应报销流程，请联系管理员设置后使用"
        :closable="false"
      >
    </el-alert>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="充值金额" prop="money">
        <el-input type="number" v-model.number="form.money" placeholder="请输入">
        </el-input>
      </el-form-item>
      <el-form-item label="平台" prop="plate">
        <el-select v-model="form.plate" placeholder="请选择">
          <el-option
            v-for="item in plate"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户" prop="husband">
        <el-input type="text" v-model="form.husband" placeholder="请输入卡号">
        </el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="对接人" prop="targetUserName">
            <el-input type="text" v-model="form.targetUserName" placeholder="对接人姓名">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" " prop="targetUserMobile">
            <el-input type="text" v-model="form.targetUserMobile" placeholder="对接人手机号">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label=" ">
            <el-input type="text" v-model="form.targetUserContactQQ" placeholder="对接人QQ">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-input type="text" v-model="form.targetUserContactWx" placeholder="对接人微信">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label=" " prop="targetUserMobile">
        <el-input type="text" v-model="form.targetUserCompany" placeholder="对接人公司名称">
        </el-input>
      </el-form-item>

      <el-form-item label="返点" prop="point">
        <el-input type="text" v-model="form.point" placeholder="请输入">
        </el-input>
      </el-form-item>
      <el-form-item label="项目" prop="project">
        <el-select v-model="form.project" multiple placeholder="请选择">
          <el-option
            v-for="item in project"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <div class="display-ib cursor-p" @click="toSelectDept">
          <span class="color-info" v-if="form.expenseDept">{{form.expenseDept.name}}</span>
        </div>
        <p class="px-font-12 color-c666">tips: 部门选择遵循如任务谁派发谁审批，选择对应部门</p>
      </el-form-item>
      <el-form-item label="退款金额">
        <el-input type="number" v-model.number="form.refund" placeholder="请输入">
        </el-input>
      </el-form-item>

      <!--申报明细-->
      <!--<p class="px-line-40 bg-f2 px-padding-lr10">申报明细</p>-->
      <!--<template v-for="(item, i) in form.applyDetail">-->
        <!--<el-form-item label="日期" prop="applyDetail[i].date">-->
          <!--<el-date-picker-->
            <!--v-model="form.applyDetail[i].date"-->
            <!--type="date"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
      <!--</template>-->

      <!--<el-form-item label="相关图片" prop="imagesList">-->
        <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--action="/upload/"-->
          <!--:on-preview="handlePreview"-->
          <!--:on-remove="handleRemove"-->
          <!--:on-success="handleSuccess"-->
          <!--:file-list="form.imagesList"-->
          <!--list-type="picture">-->
          <!--<el-button size="small" type="danger">点击上传</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">tips: 1-9张，只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->

      <el-form-item label="说明" prop="desc">
        <el-input
          type="textarea"
          v-model="form.desc"
          placeholder="请输入"
        >
        </el-input>
      </el-form-item>

      <div class="process px-margin-b50" v-if="hasSetProcess">
        <el-alert
          title="系统已设置报销流程"
          type="info"
          :closable="false"
          :description="processStr"
          show-icon>
        </el-alert>
      </div>

      <el-form-item>
        <el-button type="danger" @click="submitForm('form')">提交申请</el-button>
        <el-button @click="resetForm('form')">重置表单</el-button>
      </el-form-item>
    </el-form>

    <select-tree
      ref="selectTree"
      :selectedDept="[]"
      :selectedUser="[]"
      :selectType="1"
      :isNeedUser="false"
      :isSingleDept="true"
      @confirm="confirmSelectDept">
    </select-tree>
  </div>
</template>

<script>
  import {PAY_TYPE, PAY_WAY, SPREAD_PLATE, SPREAD_PROJECT, CONTACT_TYPE} from '../../constant'
  import http from '../../mixins/http'
  import { mapState } from 'vuex'

  export default {
    name: 'money-system-apply',
    mixins: [http],
    watch: {
      userInfo: function (val) {
        if (val) {
          this.form.expenseDept = val.dept
        }
        return val
      }
    },

    created() {
      // 赋值dept
      this.form.expenseDept = this.userInfo && this.userInfo.dept
        ? { ...this.userInfo.dept, id: this.userInfo.dept.deptId }
        : {}
        this.getProcess(this.userInfo.dept.deptId)
    },

    data() {
      const checkMoneySize = (rule, value, callback)=> {
        if (value > rule.max || value <= rule.min) {
          callback(new Error(rule.message))
        } else {
          callback()
        }
      }

      return {
        plate: SPREAD_PLATE,
        project: SPREAD_PROJECT,
        // contactType: CONTACT_TYPE,
        // payType: PAY_TYPE,
        form: {
          money: '',
          plate: 1,
          desc: '',
          payTime: '',
          payType: [],
          husband: '',
          point: '',
          project: [],
          refund: '',
          expenseDept: null,
          // imagesList: [],
          targetUserName: '',
          targetUserMobile: '',
          targetUserCompany: '',
          // targetUserContact: '',
          targetUserContactQQ: '',
          targetUserContactWx: '',
          // targetUserContactType: 1
        },
        rules: {
          desc: [
            { required: true, message: '请输入申报说明', trigger: 'blur' },
            { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
          ],
          plate: { required: true },
          husband: { required: true, message: '请输入账户', min: 1, max: 100, trigger: 'blur' },
          targetUserName: { required: true, message: '请输入对接人姓名', min: 1, max: 10, trigger: 'blur' },
          targetUserMobile: { required: true, message: '请输入对接人手机号', min: 1, max: 11, trigger: 'blur' },
          // targetUserContactQQ: { required: true, message: '请输入对接人QQ', min: 1, max: 20, trigger: 'blur' },
          // targetUserContactWx: { required: true, message: '请输入对接人微信', min: 1, max: 20, trigger: 'blur' },
          targetUserCompany: { required: true, message: '请输入对接人公司名称', min: 1, max: 100, trigger: 'blur' },
          point: { required: true, message: '请输入返点', min: 1, max: 100, trigger: 'blur' },
          money: [
            { required: true, message: '请输入充值金额', trigger: 'blur' },
            { type: 'number',  message: '金额为数字', trigger: 'blur' },
            { validator: checkMoneySize, min: 0, max: 100000000, message: '金额在0-100,000,000之间', trigger: 'blur' }
          ],
          // refund: [
          //   { required: true, message: '请输入退款金额', trigger: 'blur' },
          //   { type: 'number',  message: '金额为数字', trigger: 'blur' },
          //   { validator: checkMoneySize, min: 0, max: 100000000, message: '金额在0-100,000,000之间', trigger: 'blur' }
          // ],
          project: [
            { required: true, message: '请选择申报项目' }
          ]
          // payTime: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          // imagesList: [
          //   { required: true, message: '请上传图片材料' }
          // ]
        },
        processData: {}
      }
    },

    computed: {
      ...mapState(['userInfo']),

      hasSetProcess() {
        return this.processData.process && this.processData.process.length > 0
      },

      processStr() {
        const process = this.processData.process || []
        return ['我(发起人)'].concat(process.map(item=> {
          return `${item.name}${item.jobName ? `(${item.jobName})` : ''}`
        })).join(' -> ')
      }
    },

    methods: {
      getProcess(deptId) {
        this.http('getProcess', { userId: 1, deptId, processType: 2 }).then(res=> {
          this.processData = res
        })
      },

      // handleRemove(file, fileList) {
      //   let index = this.form.imagesList.findIndex(x => x.id || x.uid === file.id || file.uid)
      //   this.form.imagesList.splice(index, 1)
      // },
      //
      // handlePreview(file) {
      //   window.open(file.url)
      // },
      //
      // handleSuccess(file, fileList) {
      //   this.form.imagesList.push(file.data)
      // },

      submitForm(formName) {
        if (!this.hasSetProcess) {
          this.$msgbox.alert('当前部门还未设置对应报销流程，请联系管理员设置后使用')
          return false
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { targetUserContactQQ, targetUserContactWx } = this.form
            const { deptId, id } = this.form.expenseDept
            // const imagesList = this.form.imagesList.map(x => x.iid)
            // console.log(this.form.project)
            if (!targetUserContactQQ && !targetUserContactWx) {
              this.$message.error('对接人QQ或微信至少填一项')
              return
            }

            this.http('applySpreadExpense', {
              ...this.form,
              processId: this.processData.id,
              expenseDept: deptId || id,
              project: JSON.stringify(this.form.project)
              // payTime: this.form.payTime.getTime(),
              // payType: JSON.stringify(this.form.payType),
              // imagesList: JSON.stringify(imagesList)
            }).then(()=> {
              this.$message({
                message: '申请成功',
                type: 'success'
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.form.expenseDept = this.userInfo.dept
        // this.form.imagesList = []
      },

      toSelectDept() {
        this.$refs.selectTree.show()
      },

      confirmSelectDept(dept) {
        // console.log(dept)
        if (dept.length === 0) {
          return void 0
        }
        this.form.expenseDept = { ...dept[0] }
        this.getProcess(dept[0].id)
      }
    }
  }
</script>

<style lang="scss">
  .money-apply {
    width: 600px;
  }
  .upload-demo {
    .el-upload-list__item {
      display: inline-block;
      vertical-align: middle;
      width: 240px;

      &:nth-of-type(2n) {
        margin-left: 15px;
      }
    }
  }
</style>
