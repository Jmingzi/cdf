<template>
  <div class="list">
    <div class="position-f px-left-10 px-right-10 px-top-60 px-bottom-50 overflow-a">
      <div v-if="isTotal">
        <!--<div class="search__wrap ib-middle">-->
          <!--<span class="ib-middle">报销金额</span>-->
          <!--<div class="ib-middle">-->
            <!--<el-input placeholder="请输入">-->
            <!--</el-input>-->
          <!--</div>-->
        <!--</div>-->
        <div class="search__wrap search__wrap-dept ib-middle">
          <span class="ib-middle">报销部门或人</span>
          <div class="ib-middle dept" @click="$refs.selectTree.show()">
            <span class="color-info">请选择</span>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">支出类别</span>
          <div class="ib-middle">
            <el-cascader
              v-model="listPayType"
              expand-trigger="hover"
              :options="payType"
              filterable
              change-on-select>
            </el-cascader>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">审批状态</span>
          <el-select v-model="listBxStatus" placeholder="请选择">
            <el-option
              v-for="item in bxStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div><br>
        <div class="search__wrap search__wrap-date ib-middle">
          <span class="ib-middle px-width-90">报销发起时间</span>
          <div class="ib-middle">
            <el-date-picker
              v-model="listTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">关键字</span>
          <div class="ib-middle">
            <el-input placeholder="请输入" v-model="listKeyword">
            </el-input>
          </div>
        </div>
        <div class="ib-middle px-margin-b15">
          <el-button type="danger" @click="confirmSearch">搜索查询</el-button>
        </div>
        <div class="ib-middle px-margin-b15">
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>

      <el-table
        :data="listData"
        show-summary
        :height="tableWrapHeight"
        style="width: 100%">
        <el-table-column
          prop="no"
          label="工号"
          sortable
          width="130">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="报销时间"
          width="130">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="报销事由">
        </el-table-column>
        <el-table-column
          prop="money"
          label="报销金额"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="payType[0]"
          label="支出（大类）"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="payType[1]"
          label="支出（小类）"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="expenseDept"
          label="报销部门"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="报销人"
          width="80">
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="支出时间"
          width="130">
        </el-table-column>
        <el-table-column
          prop="way"
          label="支出方式"
          width="80">
        </el-table-column>
        <el-table-column
          prop="expenseStatus"
          label="状态"
          sortable
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          :width="120">
          <template slot-scope="scope">
            <el-button @click="doOption(0, scope.row)" type="text" size="small">查看</el-button>
            <template v-if="isToMe && scope.row.rstatus === 1">
              <a href="javascript:" class="color-success" @click="doOption(1, scope.row)">同意</a>
              <a href="javascript:" class="color-error" @click="doOption(2, scope.row)">拒绝</a>
            </template>
            <template v-else-if="isToMe && scope.row.rstatus === 3">
              <a href="javascript:" class="color-success" v-if="scope.row.expenseStatus === 5" @click="doOption(4, scope.row)">打款</a>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="position-f px-bottom-10 width-100 text-center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 30, 40, 50, 100]"
        :page-size="20"
        background
        layout="prev, pager, next, sizes, jumper"
        :total="listData.length">
      </el-pagination>
    </div>

    <el-dialog
      :title="(isFromMe ? '我' : '小名') + '的报销详情'"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      top="10px"
      width="500px"
      :before-close="beforeClose">
      <template v-if="currentChooseItem">
        <detail
          :item="currentChooseItem"
        />
        <span slot="footer" class="dialog-footer">
          <template v-if="isToMe && currentChooseItem.rstatus === 1">
            <el-button type="success" @click="doOption(1)" size="small">同 意</el-button>
            <el-button type="danger" @click="doOption(2)" size="small">拒 绝</el-button>
          </template>
          <el-button v-else-if="isToMe && currentChooseItem.rstatus === 3" type="primary" @click="doOption(4)" size="small">打 款</el-button>
        </span>
      </template>
    </el-dialog>

    <select-tree
      ref="selectTree"
      :selectedDept="listBxDept"
      :selectedUser="listBxUser"
      @confirm="confirmSelectTree">
    </select-tree>
  </div>
</template>

<script>
  import Detail from './MoneySystemDetail'
  import http from '../mixins/http'
  import {PAY_TYPE, BX_STATUS} from '../constant'

  export default {
    name: 'money-system-list',

    data() {
      return {
        payType: PAY_TYPE,
        tableWrapHeight: this.wrapHeight - 110,
        currentPage: 1,
        dialogVisible: false,
        currentChooseItem: null,
        listData: [],
        bxStatus: BX_STATUS,

        // 筛选条件
        listType: 0,
        listPayType: [],
        listTime: [],
        listKeyword: '',
        listBxStatus: '',
        listBxDept: [],
        listBxUser: []
      }
    },

    created() {},

    mixins: [http],

    watch: {
      wrapHeight: function(val) {
        this.tableWrapHeight = val - 110
        return val
      },
      activeName: function (name) {
        this.reset()
        if (name !== 'fourth') {
          this.getExpenseList()
        }
        return name
      }
    },

    mounted() {
      // console.log('mount')
      if (!this.isTotal) {
        this.getExpenseList()
      }
    },

    methods: {
      beforeClose(done) {
        this.currentChooseItem = null
        done()
      },

      confirmSearch() {
        this.reset()
        this.getExpenseList()
      },

      resetSearch() {
        this.reset()
        this.listType = 0
        this.listPayType = []
        this.listTime = []
        this.listKeyword = ''
        this.listBxStatus = ''
        this.listBxDept = []
        this.listBxUser = []
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      confirmSelectTree(dept, user) {
        this.listBxDept = dept
        this.listBxUser = user
      },

      reset() {
        this.listData = []
        this.currentChooseItem = null
        this.currentPage = 1
      },

      getExpenseList() {
        let createTimeBetween = []
        let expenseDept = []
        let expenseUserId = []

        if (this.listTime.length > 0) {
          createTimeBetween = [
            this.listTime[0].getTime(),
            this.listTime[1].getTime()
          ]
        }
        if (this.listBxDept.length > 0) {
          expenseDept = this.listBxDept.map(x => x.id)
        }
        if (this.listBxUser.length > 0) {
          expenseUserId = this.listBxUser.map(x => x.userId)
        }

        this.http('getExpenseList', {
          currentPage: 1,
          pageSize: 10,
          listType: this.isFromMe ? 1 : this.isToMe ? 2 : 3, // 1 我发起的 2 我收到的 3 统计列表
          payType: JSON.stringify(this.listPayType), // 支出类别 [1, 2]
          createTimeBetween: JSON.stringify(createTimeBetween),  // 筛选时间段 - [开始时间, 结束时间]
          expenseDept: JSON.stringify(expenseDept),  // 报销部门  [2]
          expenseUserId: JSON.stringify(expenseUserId), // 报销人 [1]
          keyword: this.listKeyword,      // 关键字
          expenseStatus: this.listBxStatus // 报销状态
        }).then(data=> {
          this.listData = data.list.map(item => {
            return {
              ...item,
              createTime: this.$utils.formatTime(item.createTime),
              payTime: this.$utils.formatTime(item.payTime),
              expenseStatus: BX_STATUS.find(x => Number(x.value) === Number(item.expenseStatus)).label
            }
          })
        })
      },

      doOption(type, item) {
        if (item) {
          this.currentChooseItem = item
        }

        switch (type) {
          case 0: {
            this.dialogVisible = true
          } break
          case 1: {
            this.$msgbox.prompt('请输入同意意见(非必填)').then(res => {
              _do.call(this, { status: 3, message: res.value })
            })
          } break
          case 2: {
            this.$msgbox.prompt('请输入拒绝意见(必填)').then(res => {
              if (res.value) {
                _do.call(this, { status: 4, message: res.value })
              } else {
                this.$message.error('请输入意见')
              }
            })
          } break
          case 3: {
            this.$msgbox.confirm('确定要撤回吗？')
          } break
          case 4: {
            this.$msgbox.confirm(`即将打款金额为${item.money}元给${item.name}，确定要继续吗？`).then(() => {
              _do.call(this, { status: 6 })
            })
          } break
          case 5: {
            this.$msgbox.confirm('确定要撤销打款吗？')
          } break
        }

        function _do(options) {
          this.http('handleProcessStatus', { ...options, expenseId: this.currentChooseItem.id }).then(() => {
            let msg = options.status === 3 ? '同意' : options.status === 4 ? '拒绝' : '打款'
            this.$message.success(`${msg}成功`)
            this.dialogVisible = false
          })
        }
      }
    },

    props: {
      activeName: String,
      wrapHeight: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isFromMe() {
        return this.activeName === 'second'
      },
      isToMe() {
        return this.activeName === 'third'
      },
      isTotal() {
        return this.activeName === 'fourth'
      },
      isCaiWu() {
        return true
      }
    },
    components: {
      Detail
    }
  }
</script>

<style lang="scss">
  .process__item {
    margin: 10px 0 0 30px;
  }
  .process__item-icon {
    top: 1px;
    left: -30px;
    z-index: 2;
  }
  .process__info {
    padding: 5px 10px;
  }
  .process_line {
    width: 1px;
    top: 10px;
    bottom: 10px;
    left: 6px;
    background-color: #ccc;
    z-index: 1;
  }

  .search__wrap {
    width: 280px;
    margin-bottom: 15px;
  }
  .search__wrap-dept {
    width: 300px;
    .dept {
      width: 200px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .search__wrap-date {
    width: 480px;
  }

  .expense .el-table__header {
    th, tr {
      background-color: #f5f7fa;
    }
  }

  .expense .el-table .cell {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
