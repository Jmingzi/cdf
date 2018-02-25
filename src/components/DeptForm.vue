<template>
    <div class="dept-form">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="部门名称" prop="label">
          <el-input v-model="form.label">
          </el-input>
        </el-form-item>
        <el-form-item label="部门排序">
          <el-input v-model="form.sequence">
          </el-input>
        </el-form-item>
        <div class="text-right">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: 'dept-form',
    data() {
      return {
        form: {
          label: '',
          sequence: ''
        },
        rules: {
          label: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
