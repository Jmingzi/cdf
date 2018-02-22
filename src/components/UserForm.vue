<template>
  <div class="user-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="姓名" size="mini">
            <el-input
              size="mini"
              v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" size="mini">
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
          <el-form-item label="出生年月" size="mini">
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
          <el-form-item label="所属部门" size="mini">
            <!--<el-input-->
            <!--size="mini"-->
            <!--v-model="form.department">-->
            <!--</el-input>-->
            <p class="color-info cursor-p over-text" @click="selectParentDept">
              {{form.department ? form.department : currentDept | getLabel}}
            </p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="所属职位" size="mini">
            <el-input
              size="mini"
              v-model="form.job">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">

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
          <el-form-item label="身份证号" size="mini">
            <el-input
              size="mini"
              v-model="form.idCardNumber">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="居住地址" size="mini">
            <el-input
              size="mini"
              v-model="form.detailAddress">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职日期" size="mini">
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
          <el-form-item label="转正日期" size="mini">
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
          <el-form-item label="离职日期" size="mini">
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
      :modal="false"
      :selectType="1"
      :isNeedUser="false"
      @confirm="confirmSelect">
    </select-tree>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'user-form',
    data() {
      return {
        form: {
          name: '',
          mobile: '',
          userId: 0,
          sex: 1,
          birthday: '',
          department: '',
          departmentId: 1,
          job: '',
          loginAble: true,
          idCardNumber: '',
          detailAddress: '',
          joinDate: '',
          transferDate: '',
          leaveDate: '',
          remark: ''
        }
      }
    },
    filters: {
      getLabel(item) {
        return item && item.label ? item.label.replace(` (${item.userNum})`, '') : ''
      }
    },
    computed: {
      ...mapState(['currentDept'])
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      selectParentDept() {
        if (!this.form.department) {
          this.form.department = { ...this.currentDept }
        }
        this.$message('当前部门选择为单选，默认选择选中的第一个')
        this.$refs.selectTree.show()
      },
      confirmSelect(dept) {
        this.form.department = dept[0]
      }
    }
  }
</script>

<style scoped>

</style>
