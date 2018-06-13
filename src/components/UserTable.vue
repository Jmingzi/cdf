<template>
  <div class="user-table">
    <el-table
      :data="userData"
      :stripe="true"
      :highlight-current-row="true"
      :height="userTableHeight"
      size="mini"
      border
      style="width: 100%">
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item><br>
            <el-form-item label="手机号">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ props.row.birthdayF }}</span>
            </el-form-item><br>
            <el-form-item label="所属部门">
              <span>{{ props.row.department }}</span>
            </el-form-item>
            <el-form-item label="所属职位">
              <span>{{ props.row.job }}</span>
            </el-form-item><br>
            <el-form-item label="身份证号">
              <span>{{ props.row.idCardNumber }}</span>
            </el-form-item>
            <el-form-item label="入职日期">
              <span>{{ props.row.joinDateF }}</span>
            </el-form-item><br>
            <el-form-item label="转正日期">
              <span>{{ props.row.transferDateF }}</span>
            </el-form-item>
            <el-form-item label="离职日期">
              <span>{{ props.row.leaveDateF }}</span>
            </el-form-item><br>
            <el-form-item label="居住地址">
              <span>{{ props.row.detailAddress }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item><br>
            <el-form-item label="紧急联系人">
              <span>{{ props.row.urgent }}</span>
            </el-form-item><br>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="birthdayF"
        label="出生日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="department"
        label="所属部门"
        width="100">
      </el-table-column>
      <el-table-column
        prop="job"
        label="所属职位"
        width="100">
      </el-table-column>
      <el-table-column
        prop="idCardNumber"
        label="身份证号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="joinDateF"
        label="入职日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="transferDateF"
        label="转正日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="leaveDateF"
        label="离职日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="detailAddress"
        label="居住地址"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope" v-if="contactPriv.user">
          <el-button type="text" size="mini" @click="handleClick(scope.row)">编辑</el-button>
          <!--<el-button type="text" size="mini" @click="delUser(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="50%"
      title="编辑人员"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <user-form
        ref="editUserPanel"
        @toggle="dialogVisible = false">
      </user-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import UserForm from './UserForm'

  export default {
    name: 'user-table',

    methods: {
      ...mapMutations(['setState']),

      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
          done()
        }).catch(_ => {})
      },

      handleClick(row) {
        this.dialogVisible = true
        this.setState({
          key: 'handleType',
          value: 'edit'
        })
        this.setState({
          key: 'currentUser',
          value: row
        })
        this.$nextTick(()=> {
          this.$refs['editUserPanel'].form = {
            ...row,
            birthday: row.birthday ? new Date(row.birthday) : '',
            joinDate: row.joinDate ? new Date(row.joinDate) : '',
            transferDate: row.transferDate ? new Date(row.transferDate) : '',
            leaveDate: row.leaveDate ? new Date(row.leaveDate) : '',
            department: {
              label: row.department,
              id: row.departmentId
            }
          }
        })
      },

      delUser(item) {
        this.$confirm('确定要删除吗？').then(()=> {
          console.log(item)
        })
      }
    },

    mounted() {
      if (this.userTableHeight === 0) {
        this.setState({
          key: 'userTableHeight',
          // value: document.body.clientHeight - 200
          value: window.screen.availHeight - 200
        })
      }
    },

    computed: {
      ...mapState(['userTableHeight']),
      ...mapGetters(['contactPriv', 'userList']),
    },

    props: ['userData'],

    data() {
      return {
        dialogVisible: false
      }
    },

    components: {
      UserForm
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 300px;
  }
  .el-form--inline .el-form-item__label {
    color: #aaa;
  }
</style>
