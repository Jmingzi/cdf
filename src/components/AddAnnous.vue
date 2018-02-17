<template>
  <div class="add-annous">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入公告标题">
        </el-input>
      </el-form-item>
      <el-form-item label="接收对象">
        <div class="ib-middle cursor-p">
          <span class="color-info">全体员工</span>
        </div>
      </el-form-item>
      <el-form-item label="公告内容" prop="annousContent">
        <el-input
          type="textarea"
          placeholder="请输入公告内容"
          v-model="form.annousContent">
        </el-input>
      </el-form-item>
      <div class="text-center">
        <el-button type="primary" @click="submitForm('form')">立即发布</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import resource from '../resource'
  import http from '../mixins/http'

  export default {
    name: 'add-annous',
    data() {
      return {
        form: {
          title: '',
          annousReceiveDept: [],
          annousReceiveUser: [],
          annousContent: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入公告标题', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          annousContent: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
          ]
        }
      }
    },
    mixins: [http],
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.add(this.form)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      add(data) {
        this.http(data.id ? 'editAnnous' : 'addAnnous', data).then(()=> {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
