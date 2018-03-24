<template>
  <div class="position-f width-100 top-0 bottom-0 login-container">
    <!--<div class="landscape"></div>-->
    <!--<div class="filter"></div>-->
    <!--<canvas id="canvas"></canvas>-->

    <div class="position-a login-wrap bd-ccc px-padding-20 radius-3">
      <p class="px-font-20 text-center px-padding-b20">相源科技管理后台</p>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="帐号" prop="name">
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
      <p class="color-c666 px-font-12 px-margin-l80">
        &copy; 相源科技 版权所有
      </p>
    </div>
  </div>
</template>

<script>
  import http from '../mixins/http'
  import { mapMutations } from 'vuex'
  import cookie from 'js-cookie'
  import md5 from 'blueimp-md5'
  import loginCanvas from './loginCanvas'

  export default {
    data() {
      return {
        form: {
          name: '',
          pwd: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
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
    mounted() {
      // loginCanvas()
    },
    methods: {
      ...mapMutations(['setState']),

      submitForm(formName = 'form') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http('login', {
              ...this.form,
              pwd: md5(this.form.pwd)
            }).then(res=> {
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
    background-color: rgba(255,255,255,.8);
  }

  .login-container {
    /*cursor:none;*/
    /*background:black;*/
    /*background:linear-gradient(to bottom,#000000 0%,#5788fe 100%);*/
    background-color: #f2f2f2;
  }
  .filter {
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:#fe5757;
    animation:colorChange 30s ease-in-out infinite;
    animation-fill-mode:both;
    mix-blend-mode:overlay;
  }
  @keyframes colorChange {
    0%,100% {
      opacity:0;
    }
    50% {
      opacity:.9;
    }
  }
  .landscape {
     position:absolute;
     bottom:0px;
     left:0;
     width:100%;
     height:100%;
     /*background-image:url(https://openclipart.org/image/2400px/svg_to_png/250847/Trees-Landscape-Silhouette.png);*/
     /*background-image:url('img/xkbg.png');*/
     background-size:1000px 250px;
     background-repeat:repeat-x;
     background-position:center bottom;
   }
</style>
