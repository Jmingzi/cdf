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
          :data="dept"
          :props="defaultProps"
          :show-checkbox="true"
          :default-expanded-keys="[0]"
          :highlight-current="true"
          @node-click=""
          @check-change="handleSelectDept"
          ref="tree">
        </el-tree>
      </div>

      <div class="select-tree__user overflow-a bd-gray-lighter-l ib-middle">
        <el-table
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          @select="handleSelectUser"
          @select-all="handleSelectUserAll"
          @selection-change="handleSelectUserAll"
          ref="multipleTable">
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
        <p><span class="color-c999">已选择</span> <span class="cursor-p color-info" @click="delDeptSelect(null)">清空已选择</span></p>
        <div class="select-tree__tag" v-for="(item, i) in selectDeptArr" :key="item.id">
          <span class="over-text ib-middle">{{item | getLabel}}</span>
          <i class="el-icon-close ib-middle" @click="delDeptSelect(item, i)"></i>
        </div>

        <div class="select-tree__tag" v-for="(item, i) in selectUserArr" :key="item.id">
          <span class="over-text ib-middle">{{item.name}}</span>
          <i class="el-icon-close ib-middle" @click="delUserSelect(item, i)"></i>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="reset()">取消</el-button>
        <el-button type="primary" @click="confirm">确定选择</el-button>
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
        dialogFormVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        selectDeptArr: [],
        selectUserArr: []
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

      handleSelectDept(item, isSelfCheck) {
        if (isSelfCheck) {
          this.selectDeptArr.push({ ...item, children: null })
        } else {
          this.selectDeptArr.splice(this.selectDeptArr.findIndex(x=> x.id === item.id), 1)
        }
      },

      delDeptSelect(item) {
        let tree = this.$refs.tree
        // 此处无需手动更新 selectDeptArr
        // 因为触发此方法时，tree组件会触发handleSelectDept方法
        // 也就是帮你做了复选框选择
        if (item === null) {
          tree.getCheckedKeys().forEach(key=> tree.setChecked(key, false, true))
        } else {
          tree.setChecked(item.id, false, true)
        }
      },

      delUserSelect(item) {
        // this.selectUserArr.splice(this.selectUserArr.find(x=> x.id === item.id), 1)
        this.$refs.multipleTable.toggleRowSelection(item, false)
      },

      handleSelectUser(selection) {
        // toggleRowSelection
        // clearSelection
        this.selectUserArr = [ ...selection ]
      },

      handleSelectUserAll(selection) {
        this.selectUserArr = [ ...selection ]
      },

      reset() {
        this.delDeptSelect(null)
        this.$refs.multipleTable.clearSelection()
        this.selectDeptArr = []
        this.selectUserArr = []
        this.dialogFormVisible = false
      },

      show() {
        this.dialogFormVisible = true
        this.initDept()
      },

      confirm() {
        this.dialogFormVisible = false
        this.$emit('confirm', this.selectDeptArr, this.selectUserArr)
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
