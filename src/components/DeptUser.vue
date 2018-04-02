<template>
  <div class="dept-user width-100 height-100 position-r">
    <div class="dept-user__tree position-r height-100 bg-fff">
      <div class="position-a width-100 top-0 px-bottom-50 px-padding-10">
        <tree>
        </tree>
      </div>
      <div v-if="isShowOpt.imp" class="position-a px-line-50 font-0 width-100 dept-user__import-contact bottom-0 text-center color-info">
        <!--<div class="ib-middle px-font-14 width-100">导入通讯录</div>-->
      </div>
    </div>
    <div class="dept-user__user height-100 position-a right-0 top-0 bg-fff overflow-a">
      <div class="dept-user__option-panel px-padding-10">
        <div class="fr">
          <el-button type="danger" size="mini" @click="editUser(false)" v-if="isShowOpt.user">添加员工</el-button>
          <el-button type="danger" size="mini" @click="editDept(false)" v-if="isShowOpt.dept">添加部门</el-button>
        </div>
        <template v-if="currentDept">
          <span class="color-c999">当前部门：</span>
          <span>{{currentDept | formatLabel}}</span>
          <template v-if="isShowOpt.dept">
            <a href="javascript:" @click="editDept(true)">编辑</a>
            <span>/</span>
            <a href="javascript:" class="color-error" @click="delDept">删除</a>
          </template>
        </template>
      </div>
      <div class="px-padding-10">
        <user-table>
        </user-table>
      </div>
      <div class="text-center">
        <page>
        </page>
      </div>
    </div>

    <el-dialog
      :width="dialogWidth"
      :title="deptDialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <component
        :is="currentDialogComponent"
        @handleClick="editUser"
        @toggle="dialogVisible = false"
        ref="dialog">
      </component>
    </el-dialog>
  </div>
</template>

<script>
  import Tree from "./Tree"
  import UserTable from "./UserTable"
  import Page from "./Page"
  import DeptForm from './DeptForm'
  import UserForm from './UserForm'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  const filterLabel = (item) => {
    return `${item.label.replace(`(${item.userNum})`, '')}`
  }

  export default {
    name: 'dept-user',
    components: {
      Page,
      UserTable,
      Tree,
      [DeptForm.name]: DeptForm,
      [UserForm.name]: UserForm,
    },
    data() {
      return {
        dialogVisible: false,
        deptDialogTitle: '',
        currentDialogComponent: '',
        dialogWidth: ''
      }
    },
    created() {

    },
    computed: {
      ...mapState(['currentDept', 'userInfo']),
      ...mapGetters(['contactPriv']),
      isShowOpt() {
        return this.contactPriv
      }
    },
    methods: {
      ...mapMutations(['setState']),
      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
          done()
        }).catch(_ => {})
      },
      editDept(type) {
        this.dialogWidth = '30%'
        this.currentDialogComponent = DeptForm.name
        this.deptDialogTitle = type ? '编辑部门' : '添加部门'
        this.dialogVisible = true
        this.setState({
          key: 'handleType',
          value: type ? 'edit' : 'add'
        })

        this.$nextTick(()=> {
          let deptForm = this.$refs['dialog'].$refs['form']
          if (type) {
            deptForm.model.label = filterLabel(this.currentDept)
            deptForm.model.sequence = this.currentDept.sequence
          } else {
            // add dept
            deptForm.resetFields()
          }
        })
      },
      delDept() {
        this.$confirm('确认删除？').then(_ => {
          done()
        }).catch(_ => {})
      },
      editUser(type) {
        this.dialogWidth = '50%'
        this.currentDialogComponent = UserForm.name
        this.deptDialogTitle = type ? '编辑员工' : '添加员工'
        this.dialogVisible = true
        this.setState({
          key: 'handleType',
          value: type ? 'edit' : 'add'
        })
      }
    },
    filters: {
      formatLabel(item) {
        return filterLabel(item)
      }
    }
  }
</script>

<style lang="scss">
  .dept-user__tree {
    width: 250px;
  }
  .dept-user__user {
    left: 260px;
  }
  .dept-user__import-contact {
    cursor: pointer;
    border-top: 2px #f2f2f2 solid;
    &:hover {}
  }
</style>
