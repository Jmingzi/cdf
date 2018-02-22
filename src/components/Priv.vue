<template>
  <div class="bg-fff px-padding-20">
    <div class="priv-wrap" v-if="priv">
      <h1 class="px-font-18 color-c666">菜单权限<small class="color-ccc">（部门或人）</small></h1>
      <template v-for="item in priv.menu">
        <div class="priv-item ib-middle" :key="item.id">
          <span class="fr el-icon-close color-c999 cursor-p"></span>
          <span class="color-c999">技术部：</span>
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
        <div class="priv-item ib-middle" :key="item.id">
          <span class="fr el-icon-close color-c999 cursor-p"></span>
          <span class="color-c999">技术部：</span>
          <span>{{item.privListName}}</span>
        </div>
      </template>
      <div class="priv-item priv-item__add ib-middle color-info" @click="addPriv('org')">
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
        <div class="px-padding-l10">
          <a href="javascript:">选择部门或人</a>
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
          <span>选择部门或人：</span>
          <a href="javascript:" @click="toSelect">请选择</a>
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
      :selectedDept="[]"
      :selectedUser="[]"
      :selectType="2"
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
        form: {
          selectedMenu: ['首页'],
          selectedContact: []
        },
        priv: null
      }
    },
    created() {
      this.http('getPrivList').then(res=> {
        res.menu.forEach(item=> {
          item.privListName = item.privList.map(id=> this.menu.find(item=> item.id === id).title).join('、')
        })
        res.contact.forEach(item=> {
          item.privListName = item.privList.map(id=> this.contactPriv.find(item=> item.id === id).title).join('、')
        })
        this.priv = res
      })
    },
    mixins: [http],
    methods: {
      onSubmit() {
        console.log(this.form)
      },

      addPriv(type) {
        let isMenu = type === 'menu'
        if (isMenu) {
          this.dialogMenuTitle = '添加菜单权限'
          this.dialogMenuVisible = true
        } else {
          this.dialogContactTitle = '添加组织架构操作权限'
          this.dialogContactVisible = true
        }
      },

      confirmSelect(dept, user) {

      },

      toSelect() {
        this.$refs.selectTree.show()
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
