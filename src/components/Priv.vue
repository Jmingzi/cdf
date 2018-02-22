<template>
  <div class="bg-fff px-padding-20">
    <div class="priv-wrap" v-if="priv">
      <h1 class="px-font-18 color-c666">菜单权限<small class="color-ccc">（部门或人）</small></h1>
      <template v-for="item in priv.menu">
        <div class="priv-item ib-middle" :key="item.id" @click="editPriv(item, 'menu')">
          <span class="fr el-icon-close color-c999 cursor-p"></span>
          <span class="color-c999">{{item.targetName}}：</span>
          <span>{{item.privListName}}</span>
        </div>
      </template>
      <div class="priv-item priv-item__add ib-middle color-info" @click="addPriv('menu')">
        <span class="el-icon-plus color-info"></span>
        <span>添加权限</span>
      </div>
    </div>

    <div class="priv-wrap px-margin-t20 px-padding-t20 bd-ccc-t" v-if="priv">
      <h1 class="px-font-18 color-c666">组织架构操作权限<small class="color-ccc">（人）</small></h1>
      <template v-for="item in priv.contact">
        <div class="priv-item ib-middle" :key="item.id" @click="editPriv(item, 'contact')">
          <span class="fr el-icon-close color-c999 cursor-p"></span>
          <span class="color-c999">{{item.targetName}}：</span>
          <span>{{item.privListName}}</span>
        </div>
      </template>
      <div class="priv-item priv-item__add ib-middle color-info" @click="addPriv('contact')">
        <span class="el-icon-plus color-info"></span>
        <span>添加权限</span>
      </div>
    </div>

    <!--选择菜单-->
    <el-dialog
      :width="`400px`"
      :title="dialogMenuTitle"
      :visible.sync="dialogMenuVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="px-padding-l5">
          <span>选择部门或人员：</span>
          <a href="javascript:" @click="toSelect">{{showDialogSelectName('menu')}}</a>
        </div>
        <el-form-item label="选择菜单权限">
          <el-checkbox-group v-model="form.selectedMenu">
            <el-checkbox
              v-for="item in menu"
              :key="item.id"
              :label="item.title"
              :name="item.componentName">
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--通讯录权限-->
    <el-dialog
      :width="`400px`"
      :title="dialogContactTitle"
      :visible.sync="dialogContactVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="px-padding-l10">
          <span>选择人员：</span>
          <a href="javascript:" @click="toSelect">{{showDialogSelectName('contact')}}</a>
        </div>
        <el-form-item label="选择通讯录权限">
          <el-checkbox-group v-model="form.selectedContact">
            <el-checkbox
              v-for="item in contactPriv"
              :key="item.id"
              :label="item.title"
              :name="item.componentName">
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <select-tree
      ref="selectTree"
      :selectedDept="form.targetDept"
      :selectedUser="form.targetUser"
      :selectType="selectType"
      @confirm="confirmSelect">
    </select-tree>
  </div>
</template>

<script>
  import { menu, contactPriv } from '../constant'
  import http from '../mixins/http'

  export default {
    name: 'priv',
    data() {
      return {
        dialogMenuTitle: '',
        dialogMenuVisible: false,
        dialogContactTitle: '',
        dialogContactVisible: false,
        menu,
        contactPriv,
        currentDialog: '',
        currentEditPriv: null,
        form: {
          selectedMenu: [],
          selectedContact: [],
          targetDept: [],
          targetUser: []
        },
        priv: null,
        selectType: 0
      }
    },
    created() {
      this.http('getPrivList').then(res=> {
        _handleRes(res.menu, this.menu)
        _handleRes(res.contact, this.contactPriv)
        this.priv = res

        function _handleRes(data, privConstant) {
          data.forEach(item=> {
            item.privListName = item.privList.map(id=> privConstant.find(item=> item.id === id).title).join('、')
            item.targetName = item.targetDept.map(x=> x.label).join('、')
              + `${item.targetUser.length > 0 ? '、' : ''}`
              + item.targetUser.map(x=> x.name).join('、')
          })
        }
      })
    },
    mixins: [http],
    computed: {
      isMenuDialog() {
        return this.currentDialog === 'menu'
      }
    },
    methods: {
      onSubmit() {
        let { targetDept, targetUser, selectedMenu, selectedContact } = this.form
        if (this.isMenuDialog && targetDept.length === 0 && targetUser.length === 0) {
          this.$message({
            message: '请选择部门或人员',
            type: 'error'
          })
          return void 0
        } else if (!this.isMenuDialog && targetUser.length === 0) {
          this.$message({
            message: '请选择人员',
            type: 'error'
          })
          return void 0
        }

        if (
          this.isMenuDialog && selectedMenu.length === 0 ||
          !this.isMenuDialog && selectedContact.length === 0
        ) {
          this.$message({
            message: '请选择对应权限',
            type: 'error'
          })
          return void 0
        }

        // 转换权限id
        let menuPrivIdList = selectedMenu.map(name=> this.menu.find(x=> x.title === name).id)
        let contactPrivIdList = selectedContact.map(name=> this.contactPriv.find(x=> x.title === name).id)
        let reqData = {
          targetDept,
          targetUser,
          menuPrivIdList,
          contactPrivIdList
        }
        let url = 'addPriv'
        let message = '添加权限成功'
        if (this.currentEditPriv) {
          url = 'editPriv'
          message = '修改权限成功'
          reqData.id = this.currentEditPriv.id
        }
        this.http(url, reqData).then(()=> {
          this.$message({
            message,
            type: 'success'
          })
          this[this.isMenuDialog ? 'dialogMenuVisible' : 'dialogContactVisible'] = false
        })
      },

      editPriv(item, type) {
        this.currentEditPriv = item
        this.currentDialog = type
        this.form.targetDept = item.targetDept
        this.form.targetUser = item.targetUser

        if (this.isMenuDialog) {
          this.dialogMenuTitle = '修改菜单权限'
          this.dialogMenuVisible = true
          this.selectType = 0
          this.form.selectedMenu = item.privList.map(id=> this.menu.find(x=> x.id === id).title)
        } else {
          this.dialogContactTitle = '修改组织架构操作权限'
          this.dialogContactVisible = true
          this.selectType = 2
          this.form.selectedContact = item.privList.map(id=> this.contactPriv.find(x=> x.id === id).title)
        }
      },

      addPriv(type) {
        this.currentEditPriv = null
        this.currentDialog = type
        this.form.targetDept = []
        this.form.targetUser = []

        if (this.isMenuDialog) {
          this.dialogMenuTitle = '添加菜单权限'
          this.dialogMenuVisible = true
          this.selectType = 0
          this.form.selectedMenu = []
        } else {
          this.dialogContactTitle = '添加组织架构操作权限'
          this.dialogContactVisible = true
          this.selectType = 2
          this.form.selectedContact = []
        }
      },

      confirmSelect(dept, user) {
        this.form.targetDept = dept
        this.form.targetUser = user
      },

      toSelect() {
        this.$refs.selectTree.show()
      },

      showDialogSelectName(type) {
        let isMenu = type === 'menu'
        let { targetDept, targetUser } = this.form
        if (isMenu) {
          return targetDept.length === 0 && targetUser.length === 0
            ? '请选择'
            : targetDept.map(x=> x.label.replace(`(${x.userNum})`, '')).join('、') + (targetUser.length > 0 ? '、' : '') + targetUser.map(x=> x.name).join('、')
        } else {
          return targetUser.length === 0
            ? '请选择'
            : targetUser.map(x=> x.name).join('、')
        }
      }
    }
  }
</script>

<style lang="scss">
  .priv-item {
    margin: 10px 10px 0 0;
    border: 1px #cfcfcf solid;
    padding: 10px;
    cursor: pointer;

    .el-icon-close {
      margin: 3px 0 0 15px;
    }

    &.priv-item__add {
      border-color: #0275d8;
    }
  }

  .el-checkbox-group .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .el-checkbox-group .el-checkbox {
    padding-right: 20px;
  }
</style>
