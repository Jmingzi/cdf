<template>
  <div class="select-tree">
    <el-dialog
      :width="width"
      :title="title"
      :show-close="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      :modal="modal"
      top="10vh"
      :visible.sync="dialogFormVisible">

      <div class="select-tree__dept ib-middle">
        <el-tree
          v-if="dialogFormVisible"
          class="filter-tree"
          node-key="id"
          :data="dept"
          :props="defaultProps"
          :show-checkbox="isNeedDept"
          :default-expanded-keys="[0]"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleClickDept"
          @check-change="handleSelectDept"
          ref="tree">
        </el-tree>
      </div>

      <div class="select-tree__user overflow-a bd-gray-lighter-l ib-middle" v-if="isNeedUser">
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
        <div class="select-tree__tag" v-for="(item, i) in selectDeptArr" :key="'dept-' + item.id">
          <span class="over-text ib-middle">{{item | getLabel}}</span>
          <i class="el-icon-close ib-middle" @click="delDeptSelect(item, i)"></i>
        </div>

        <div class="select-tree__tag" v-for="(item, i) in selectUserArr" :key="'user-' + item.id">
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
    watch: {
      // selectType: function (val, oldVal) {
      //   if (val !== oldVal) {
      //     console.log(val)
      //   }
      //   return val
      // }
    },
    methods: {
      ...mapActions(['getUserById']),
      ...mapMutations(['setState']),

      checkDefaultUser(user) {
        this.$nextTick(()=> {
          let tableSelect
          this.selectedUser.forEach(select=> {
            if (user.some(item=> item.id === select.id)) {
              tableSelect = this.userList.find(x=> x.id === select.id)
              this.$refs.multipleTable.toggleRowSelection(tableSelect, true)
            }
          })
        })
      },

      checkDefaultDept() {
        this.$nextTick(()=> {
          this.selectedDept.forEach(x=> this.$refs.tree.setChecked(x.id, true, false))
        })
      },

      getDeptCallback(deptArr) {
        // setCurrentKey
        this.$nextTick(()=> {
          this.$refs.tree.setCurrentKey(deptArr[0].id)
        })

        if (this.isNeedDept) {
          this.checkDefaultDept()
        }

        // get current dept user
        if (this.isNeedUser) {
          this.getUserById({
            deptId: deptArr[0].id,
            callback: this.checkDefaultUser.bind(this)
          })
        }
      },

      handleClickDept(item) {
        if (item.id !== this.currentDept.id) {
          if (this.isNeedDept) {
            this.checkDefaultDept()
          }

          if (this.isNeedUser) {
            this.getUserById({
              deptId: item.id,
              callback: this.checkDefaultUser.bind(this)
            })
          }
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
        this.isNeedUser && this.$refs.multipleTable.clearSelection()
        this.selectDeptArr = []
        this.selectUserArr = []
        this.dialogFormVisible = false
      },

      show() {
        this.dialogFormVisible = true
        this.initDept()
      },

      confirm() {
        this.$emit('confirm', this.selectDeptArr.map(item=> {
          item.name = item.label.replace(` (${item.userNum})`, '')
          return item
        }), this.selectUserArr)
        this.reset()
        this.dialogFormVisible = false
      }
    },
    computed: {
      ...mapState(['dept']),
      ...mapGetters(['userList']),

      isNeedDept() {
        return this.selectType !== 2
      }
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
      // 0 全部
      // 1 部门
      // 2 人员
      selectType: {
        type: Number,
        default: 0
      },
      selectedDept: {
        type: Array,
        default() {
          return []
        }
      },
      selectedUser: {
        type: Array,
        default() {
          return []
        }
      },
      modal: {
        type: Boolean,
        default: true
      },
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
