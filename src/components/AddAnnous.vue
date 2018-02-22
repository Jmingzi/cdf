<template>
  <div class="add-annous">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入公告标题">
        </el-input>
      </el-form-item>
      <el-form-item label="接收对象">
        <div class="ib-middle cursor-p"  @click="selectObj">
          <span class="color-info" v-if="form.annousReceiveDept.length === 0 && form.annousReceiveUser.length === 0">全体员工</span>
          <div class="color-info" v-else>
            <span
              v-for="(item, i) in form.annousReceiveDept">
              {{item | getLabel}}{{i !== form.annousReceiveDept.length - 1 || form.annousReceiveUser.length > 0 ? '、' : ''}}
            </span>
            <span
              v-if="form.annousReceiveUser.length > 0"
              v-for="(item, i) in form.annousReceiveUser">
              {{item.name}}{{i !== form.annousReceiveUser.length - 1 ? '、' : ''}}
            </span>
          </div>
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

    <select-tree
      ref="selectTree"
      :selectedDept="form.annousReceiveDept"
      :selectedUser="form.annousReceiveUser"
      @confirm="confirmSelect">
    </select-tree>
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
    filters: {
      getLabel(item) {
        return item.label.replace(` (${item.userNum})`, '')
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
      },
      selectObj() {
        this.$refs.selectTree.show()
      },
      confirmSelect(dept, user) {
        this.form.annousReceiveDept = dept
        this.form.annousReceiveUser = user
      }
    }
  }
</script>

<style scoped>

</style>
