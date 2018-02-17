<template>
  <div class="select-tree">
    <el-dialog
      :width="width"
      :title="title"
      :show-close="false"
      :close-on-click-modal="false"
      top="10vh"
      :visible.sync="dialogFormVisible">

      <div class="select-tree__dept ib-middle">
        <el-tree
          class="filter-tree"
          node-key="id"
          @node-click=""
          :data="dept"
          :props="defaultProps"
          :show-checkbox="true"
          :default-expanded-keys="[0]"
          :highlight-current="true"
          ref="tree">
        </el-tree>
      </div>

      <div class="select-tree__user overflow-a bd-gray-lighter-l ib-middle">
        <el-table
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleUserChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
        </el-table>

      </div>

      <div class="select-tree__selected overflow-a bd-gray-lighter-t px-font-12">
        <p><span class="color-c999">已选择</span> <span class="cursor-p color-info">清空已选择</span></p>
        <div class="select-tree__tag">
          <span class="over-text ib-middle">技术部技术部技术部技术部</span>
          <i class="el-icon-close ib-middle"></i>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定选择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex'
  import dept from '../mixins/dept'

  export default {
    name: 'select-tree',
    mixins: [dept],
    data() {
      return {
        dialogFormVisible: true,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        multipleSelection: []
      }
    },
    created() {
    },
    methods: {
      ...mapActions(['getUserById']),

      getDeptCallback(deptArr) {
        // setCurrentKey
        this.$nextTick(()=> {
          this.$refs.tree.setCurrentKey(deptArr[0].id)
        })

        // get current dept user
        if (this.isNeedUser) {
          this.getUserById(deptArr[0].id)
        }
      },

      handleUserChange(item) {
        // console.log(item)
      }
    },
    computed: {
      ...mapState(['dept']),
      ...mapGetters(['userList'])
    },
    props: {
      title: {
        type: String,
        default: '选择部门或人员'
      },
      width: {
        type: String,
        default: '600px'
      },
      selectType: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss">
  .select-tree__dept {
    width: 230px;
    height: 300px;
  }
  .select-tree__user {
    width: 325px;
    height: 300px;
  }
  .select-tree__selected {
    height: 100px;
  }
  .select-tree__tag {
    display: inline-block;
    padding: 0 5px;
    background-color: #f2f2f2;
    margin: 0 10px 10px 0;
    span {
      max-width: 100px;
      border-right: 1px #dedede solid;
      padding-right: 5px;
    }
    i {
      cursor: pointer;
      &:hover {
        color: #22a7f0;
      }
    }
  }
</style>
