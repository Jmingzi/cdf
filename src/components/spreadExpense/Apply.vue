<template>
  <div class="money-apply">
    <div class="px-margin-b20" v-if="!hasSetProcess && processData.id">
      <el-alert
        title="提示"
        type="error"
        description="当前部门还未设置对应报销流程，请联系管理员设置后使用"
        :closable="false">
      </el-alert>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="报销事由" prop="desc">
        <el-input type="textarea" v-model="form.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="报销金额" prop="money">
        <el-input type="number" v-model.number="form.money">
        </el-input>
      </el-form-item>
      <el-form-item label="支出类别" prop="payType">
        <el-cascader
          expand-trigger="hover"
          :options="payType"
          v-model="form.payType">
        </el-cascader>
      </el-form-item>
      <el-form-item label="支出方式" prop="way">
        <el-select v-model="form.way" placeholder="请选择">
          <el-option
            v-for="item in payWay"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出时间" prop="payTime">
        <el-date-picker
          v-model="form.payTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报销部门">
        <div class="display-ib cursor-p" @click="toSelectDept">
          <span class="color-info" v-if="form.expenseDept">{{form.expenseDept.name}}</span>
        </div>
      </el-form-item>
      <el-form-item label="相关图片" prop="imagesList">
        <el-upload
          class="upload-demo"
          action="/upload/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="form.imagesList"
          list-type="picture">
          <el-button size="small" type="danger">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">tips: 1-9张，只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <div class="process px-margin-b50">
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
      @confirm="confirmSelectDept">
    </select-tree>
  </div>
</template>

<script>
  import {PAY_TYPE, PAY_WAY} from '../../constant'
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
        payWay: PAY_WAY,
        payType: PAY_TYPE,
        form: {
          money: '',
          way: '',
          desc: '',
          payTime: '',
          payType: [],
          expenseDept: null,
          imagesList: []
        },
        rules: {
          desc: [
            { required: true, message: '请输入报销事由', trigger: 'blur' },
            { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '请输入金额', trigger: 'blur' },
            { type: 'number',  message: '金额为数字', trigger: 'blur' },
            { validator: checkMoneySize, min: 0, max: 100000000, message: '金额在0-100,000,000之间', trigger: 'blur' }
          ],
          way: [
            { required: true, message: '请选择支出方式' }
          ],
          payType: [
            { required: true, message: '请选择支出类别' }
          ],
          payTime: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          imagesList: [
            { required: true, message: '请上传图片材料' }
          ]
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
        this.http('getProcess', { userId: 1, deptId }).then(res=> {
          this.processData = res
        })
      },

      handleRemove(file, fileList) {
        let index = this.form.imagesList.findIndex(x => x.id || x.uid === file.id || file.uid)
        this.form.imagesList.splice(index, 1)
      },

      handlePreview(file) {
        window.open(file.url)
      },

      handleSuccess(file, fileList) {
        this.form.imagesList.push(file.data)
      },

      submitForm(formName) {
        if (!this.hasSetProcess) {
          this.$msgbox.alert('当前部门还未设置对应报销流程，请联系管理员设置后使用')
          return false
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { deptId, id } = this.form.expenseDept
            const imagesList = this.form.imagesList.map(x => x.iid)

            this.http('applyExpense', {
              ...this.form,
              processId: this.processData.id,
              expenseDept: deptId || id,
              payTime: this.form.payTime.getTime(),
              payType: JSON.stringify(this.form.payType),
              imagesList: JSON.stringify(imagesList)
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
        this.form.imagesList = []
      },

      toSelectDept() {
        this.$refs.selectTree.show()
      },

      confirmSelectDept(dept) {
        // console.log(dept)
        if (dept.length === 0) {
          return void 0
        } else if (dept.length > 1) {
          this.$message('默认取第一个部门')
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
