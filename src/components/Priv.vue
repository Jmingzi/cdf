<template>
  <div class="bg-fff px-padding-20">
    <div class="priv-wrap">
      <h1 class="px-font-18 color-c666">菜单权限<small class="color-ccc">（部门或人）</small></h1>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span class="color-c999">技术部：</span>
        <span>首页</span>
      </div>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span class="color-c999">张三：</span>
        <span>首页</span>、
        <span>首页</span>、
        <span>首页</span>、
        <span>首页</span>
      </div>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span class="color-c999">李四：</span>
        <span>首页</span>
      </div>
      <div class="priv-item priv-item__add ib-middle color-info" @click="addPriv('menu')">
        <span class="el-icon-plus color-info"></span>
        <span>添加权限</span>
      </div>
    </div>

    <div class="priv-wrap px-margin-t20 px-padding-t20 bd-ccc-t">
      <h1 class="px-font-18 color-c666">组织架构操作权限<small class="color-ccc">（人）</small></h1>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span>张三</span>
      </div>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span>李四</span>
      </div>
      <div class="priv-item ib-middle">
        <span class="fr el-icon-close color-c999 cursor-p"></span>
        <span>王麻子</span>
      </div>
      <div class="priv-item priv-item__add ib-middle color-info" @click="addPriv('org')">
        <span class="el-icon-plus color-info"></span>
        <span>添加权限</span>
      </div>
    </div>

    <el-dialog
      :width="`400px`"
      :title="deptDialogTitle"
      :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="px-padding-l10">
          <a href="javascript:">选择部门或人</a>
        </div>
        <el-form-item label="选择菜单">
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
  </div>
</template>

<script>
  import { menu } from '../constant'

  export default {
    name: 'priv',
    data() {
      return {
        dialogVisible: false,
        deptDialogTitle: '',
        menu,
        form: {
          selectedMenu: ['首页']
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },

      addPriv(type) {
        this.deptDialogTitle = type === 'menu' ? '添加菜单权限' : '添加组织架构操作权限'
        this.dialogVisible = true
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
