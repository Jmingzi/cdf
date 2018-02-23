<template>
  <div class="position-a login-wrap bd-ccc px-padding-20 radius-3">
    <p class="px-font-20 text-center px-padding-b20">登录管理后台</p>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" clearable placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import http from '../mixins/http'
  import { mapMutations } from 'vuex'
  import cookie from 'js-cookie'

  export default {
    data() {
      return {
        form: {
          name: '',
          pwd: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mixins: [http],
    created() {

    },
    methods: {
      ...mapMutations(['setState']),

      submitForm(formName = 'form') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http('login', this.form).then(res=> {
              Object.keys(res).forEach(key=> {
                // is_update -1表示未修改  需提示起对密码进行修改  1表示已经修改  不需要进行修改
                cookie.set(key, res[key], {expires: 1})
              })
              this.$router.push('/')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      resetForm(formName = 'form') {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-wrap {
    width: 400px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
