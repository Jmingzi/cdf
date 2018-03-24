<template>
  <div class="user-form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="姓名" size="mini" prop="name">
            <el-input
              size="mini"
              v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" size="mini" prop="mobile">
            <el-input
              size="mini"
              v-model="form.mobile">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="工号" size="mini">
            <el-input
              size="mini"
              v-model="form.userId" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" size="mini">
            <el-select
              size="mini"
              v-model="form.sex"
              placeholder="请选择性别">
              <el-option
                label="男"
                :value="1">
              </el-option>
              <el-option
                label="女"
                :value="2">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="出生年月" size="mini" prop="birthday">
            <el-date-picker
              type="date"
              size="mini"
              placeholder="选择日期"
              v-model="form.birthday"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div @click="selectParentDept">
            <el-form-item label="所属部门" size="mini">
              <!--<el-input-->
              <!--size="mini"-->
              <!--v-model="form.department">-->
              <!--</el-input>-->
              <p class="color-info cursor-p over-text">
                {{form.department ? form.department : currentDept | getLabel}}
              </p>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="所属职位" size="mini" prop="job">
            <el-input
              size="mini"
              v-model="form.job">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工状态" size="mini">
            <el-select
              size="mini"
              v-model="form.userStatus"
              placeholder="请选择员工状态">
              <el-option
                label="试用期"
                :value="1">
              </el-option>
              <el-option
                label="正式员工"
                :value="2">
              </el-option>
              <el-option
                label="已离职"
                :value="3">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="允许登陆" size="mini">
            <el-switch
              v-model="form.loginAble">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" size="mini" prop="idCardNumber">
            <el-input
              size="mini"
              v-model="form.idCardNumber">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="居住地址" size="mini" prop="detailAddress">
            <el-input
              size="mini"
              v-model="form.detailAddress">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职日期" size="mini" prop="joinDate">
            <el-date-picker
              size="mini"
              type="date"
              placeholder="选择日期"
              v-model="form.joinDate"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="转正日期" size="mini" prop="transferDate">
            <el-date-picker
              size="mini"
              type="date"
              placeholder="选择日期"
              v-model="form.transferDate"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期" size="mini" prop="leaveDate">
            <el-date-picker
              size="mini"
              type="date"
              placeholder="选择日期"
              v-model="form.leaveDate"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注说明" size="mini">
        <el-input
          type="textarea"
          v-model="form.remark">
        </el-input>
      </el-form-item>
      <el-form-item size="mini">
        <div class="text-right">
          <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>

    <select-tree
      ref="selectTree"
      title="选择所属部门"
      :selectedDept="form.department ? [form.department] : []"
      :selectedUser="[]"
      :selectType="1"
      :isSingleDept="true"
      :isNeedUser="false"
      @confirm="confirmSelect">
    </select-tree>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import http from '../mixins/http'

  export default {
    name: 'user-form',
    mixins: [http],
    data() {
      const checkSolidField = (rule, value, callback)=> {
        if (value.length !== rule.len) {
          callback(new Error(`${rule.pre}长度为${rule.len}位`))
        } else {
          callback()
        }
      }
      const checkDate = (rule, value, callback)=> {
        if (
          this.form.userStatus === 2 &&
          rule.t === 'transferDate' &&
          !value ||
          this.form.userStatus === 3 &&
          rule.t === 'leaveDate' &&
          !value
        ) {
          // 转正 或 离职
          callback(new Error(rule.message))
        } else {
          callback()
        }
      }

      return {
        form: {
          name: '',
          mobile: '',
          userId: 0,
          sex: 1,
          birthday: '',
          department: null,
          job: '',
          loginAble: true,
          idCardNumber: '',
          detailAddress: '',
          joinDate: '',
          transferDate: '',
          leaveDate: '',
          remark: '',
          userStatus: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkSolidField, len: 11, pre: '手机号' }
          ],
          birthday: [
            { required: true, message: '请选择出生年月', trigger: 'blur' }
          ],
          joinDate: [
            { required: true, message: '请选择入职日期', trigger: 'blur' }
          ],
          job: [
            { required: true, message: '请输入职位', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          idCardNumber: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { validator: checkSolidField, len: 18, pre: '身份证号码' }
          ],
          detailAddress: [
            { required: true, message: '请输入居住地址', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          transferDate: [
            { validator: checkDate, t: 'transferDate', message: '请选择转正日期' }
          ],
          leaveDate: [
            { validator: checkDate, t: 'leaveDate', message: '请选择离职日期' }
          ]
        }
      }
    },
    filters: {
      getLabel(item) {
        return item && item.label ? item.label.replace(` (${item.userNum})`, '') : ''
      }
    },
    computed: {
      ...mapState(['currentDept', 'handleType', 'currentUser'])
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const { department, birthday, joinDate, transferDate, leaveDate } = this.form

            let data = {
              ...this.form,
              departmentId: department.id,
              birthday: birthday ? birthday.getTime() : '',
              joinDate: joinDate ? joinDate.getTime() : '',
              transferDate: transferDate ? transferDate.getTime() : '',
              leaveDate: leaveDate ? leaveDate.getTime() : ''
            }
            delete data.department

            if (this.handleType === 'edit') {
              data.id = this.currentUser.id
            }
            this.http('saveUser', data).then(()=> {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('toggle')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      selectParentDept() {
        if (!this.form.department) {
          this.form.department = { ...this.currentDept }
        }
        // this.$message('当前部门选择为单选，默认选择选中的第一个')
        this.$refs.selectTree.show()
      },
      confirmSelect(dept) {
        this.form.department = dept[0]
      }
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
