<template>
  <div class="money-apply">
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
      <el-form-item label="相关图片">
        <el-upload
          class="upload-demo"
          action="/upload/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="imagesList"
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
  </div>
</template>

<script>
  import {PAY_TYPE, PAY_WAY} from '../constant'
  import http from '../mixins/http'
  const payWay = PAY_WAY
  const payType = PAY_TYPE

  export default {
    name: 'money-system-apply',
    mixins: [http],
    data() {
      const checkMoneySize = (rule, value, callback)=> {
        if (value > rule.max || value <= rule.min) {
          callback(new Error(rule.message))
        } else {
          callback()
        }
      }

      return {
        payWay,
        payType,
        imagesList: [],
        form: {
          money: '',
          way: '',
          desc: '',
          payTime: '',
          payType: []
        },
        rules: {
          desc: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
          ]
        }
      }
    },
    props: {
      process: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      processStr() {
        return ['我(发起人)'].concat(this.process.map(item=> {
          return `${item.name}${item.jobName ? `(${item.jobName})` : ''}`
        })).join(' -> ')
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http('applyExpense', {
              ...this.form,
              payTime: this.form.payTime.getTime(),
              process: this.process
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
