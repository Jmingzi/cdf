<template>
  <div class="bg-fff px-padding-20 height-100">
    <div class="priv__wrap">
      <div class="fr">
        <el-button type="danger" size="mini" @click="addPriv()">添加权限</el-button>
      </div>
      <h1 class="px-font-18 color-c666 px-margin-b20">权限列表</h1>

      <el-table
        v-if="priv"
        :data="priv"
        style="width: 100%">
        <el-table-column
          prop="aliasName"
          label="权限对象">
        </el-table-column>
        <el-table-column
          prop="aliasMenu"
          label="菜单权限">
        </el-table-column>
        <el-table-column
          prop="aliasContact"
          label="操作权限">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <a href="javascript:" class="color-info" @click="editPriv(scope.row)">编辑</a>
            <a href="javascript:" class="color-error" @click="delPriv(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="priv-wrap" v-if="false">
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

    <div class="priv-wrap px-margin-t20 px-padding-t20 bd-ccc-t" v-if="false">
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
      width="600px"
      :title="dialogTitle"
      :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <div>
          <span class="ib-middle px-width-100 text-right px-padding-r15">选择对象</span>
          <a href="javascript:" @click="$refs.selectTree.show()">{{showDialogSelectName()}}</a>
        </div>
        <el-form-item label="菜单权限">
          <el-checkbox-group v-model="form.selectedMenu">
            <el-checkbox
              v-for="item in menu"
              :key="item.id"
              :label="item.title"
              :name="item.componentName">
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="操作权限">
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
      :selectType="0"
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
        dialogTitle: '',
        dialogVisible: false,
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
        priv: null
      }
    },

    created() {
      this.getPriv()
    },
    mixins: [http],
    computed: {

    },
    methods: {
      getPriv() {
        this.http('getPrivList').then(res=> {
          this.priv = res.map(item => {
            item.aliasName = [].concat(
              item.targetDept.map(x => x.label),
              item.targetUser.map(x => x.name)
            ).join('、')

            item.aliasMenu = item.privMenu.map(id => {
              return (menu.find(x => x.id === id) || {}).title
            }).join('、')

            item.aliasContact = item.privContact.map(id => {
              return (contactPriv.find(x => x.id === id) || {}).title
            }).join('、')
            // item.aliasList = [].concat(
            //   item.privMenu.map(id => {
            //     return (menu.find(x => x.id === id) || {}).title
            //   }),
            //   item.privContact.map(id => {
            //     return (contactPriv.find(x => x.id === id) || {}).title
            //   })
            // ).join('、')
            return item
          })
          // function _handleRes(data, privConstant) {
          //   data.forEach(item=> {
          //     item.privListName = item.privList.map(id=> privConstant.find(item=> item.id === id).title).join('、')
          //     item.targetName = item.targetDept.map(x=> x.label).join('、')
          //       + `${item.targetUser.length > 0 ? '、' : ''}`
          //       + item.targetUser.map(x=> x.name).join('、')
          //   })
          // }
        })
      },

      onSubmit() {
        let { targetDept, targetUser, selectedMenu, selectedContact } = this.form
        if (targetDept.length === 0 && targetUser.length === 0) {
          this.$message.error('请选择部门或人员')
          return void 0
        }

        if (selectedMenu.length === 0 && selectedContact.length === 0) {
          this.$message.error('请选择对应权限')
          return void 0
        }

        // 转换权限id
        let menuPrivIdList = selectedMenu.map(name=> this.menu.find(x=> x.title === name).id)
        let contactPrivIdList = selectedContact.map(name=> this.contactPriv.find(x=> x.title === name).id)
        let reqData = {
          targetDept: JSON.stringify(targetDept.map(x => ({ id: x.id, label: x.label }))),
          targetUser: JSON.stringify(targetUser.map(x => ({ userId: x.userId, name: x.name }))),
          menuPrivIdList: JSON.stringify(menuPrivIdList),
          contactPrivIdList: JSON.stringify(contactPrivIdList)
        }
        let url = 'addPriv'
        let message = '添加权限成功'
        if (this.currentEditPriv) {
          url = 'editPriv'
          message = '修改权限成功'
          reqData.id = this.currentEditPriv.id
        }
        this.http(url, reqData).then(()=> {
          this.$message.success(message)
          this.dialogVisible = false
          this.getPriv()
        })
      },

      editPriv(item) {
        this.currentEditPriv = item
        this.dialogVisible = true
        this.dialogTitle = '编辑权限'

        this.form.targetDept = item.targetDept
        this.form.targetUser = item.targetUser
        this.form.selectedMenu = item.privMenu.map(id=> this.menu.find(x=> x.id === id).title)
        this.form.selectedContact = item.privContact.map(id=> this.contactPriv.find(x=> x.id === id).title)
      },

      delPriv(item) {
        this.$msgbox.confirm('确定要删除吗？').then(() => {
          this.http('delPriv', { id: item.id }).then(() => {
            this.$message.success('删除成功')
            this.getPriv()
          })
        })
      },

      addPriv() {
        this.currentEditPriv = null
        this.dialogVisible = true
        this.dialogTitle = '添加权限'

        this.form.targetDept = []
        this.form.targetUser = []
        this.form.selectedMenu = []
        this.form.selectedContact = []
      },

      confirmSelect(dept, user) {
        this.form.targetDept = dept
        this.form.targetUser = user
      },

      showDialogSelectName() {
        let { targetDept, targetUser } = this.form
        return targetDept.length === 0 && targetUser.length === 0
          ? '请选择'
          : targetDept.map(x=> x.label.replace(`(${x.userNum})`, '')).join('、') + (targetUser.length > 0 ? '、' : '') + targetUser.map(x=> x.name).join('、')
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

  .priv__wrap .el-table__header {
    th, tr {
      background-color: #f5f7fa;
    }
  }
</style>
