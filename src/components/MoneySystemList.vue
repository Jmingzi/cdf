<template>
  <div class="list">
    <div class="position-f px-left-10 px-right-10 px-top-60 px-bottom-50 overflow-a">
      <div class="px-font-12" v-if="isTotal || isToMe">
        <div class="search__wrap search__wrap-dept ib-middle">
          <span class="ib-middle">报销部门或人</span>
          <div class="ib-middle dept" @click="$refs.selectTree.show()">
            <span class="color-info">{{ formatListDeptUser }}</span>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">支出类别</span>
          <div class="ib-middle">
            <el-cascader
              size="mini"
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
          <el-select size="mini" v-model="listBxStatus" placeholder="请选择">
            <el-option
              v-for="item in bxStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">支出方式</span>
          <el-select size="mini" v-model="listPayWay" placeholder="请选择">
            <el-option
              v-for="item in payWay"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">关键字</span>
          <div class="ib-middle">
            <el-input placeholder="请输入" size="mini" v-model="listKeyword">
            </el-input>
          </div>
        </div>
        <div class="search__wrap search__wrap-date ib-middle">
          <span class="ib-middle px-width-90">报销发起时间</span>
          <div class="ib-middle">
            <el-date-picker
              size="mini"
              v-model="listTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="ib-middle px-margin-b15">
          <el-button type="danger" size="mini" @click="confirmSearch">搜索查询</el-button>
        </div>
        <div class="ib-middle px-margin-b15">
          <el-button size="mini" @click="resetSearch">重置</el-button>
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
          <template slot-scope="scope">
            <span class="color-error font-bold">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payee"
          label="收款人"
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
          label="状态"
          sortable
          width="80">
          <template slot-scope="scope">
            <span :class="scope.row.statusItem.color">{{ scope.row.statusItem.label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          :width="120">
          <template slot-scope="scope">
            <el-button @click="doOption(0, scope.row)" type="text" size="small">查看</el-button>
            <template v-if="isFromMe">
              <a href="javascript:" v-if="scope.row.rstatus === 1" class="color-error" @click="doOption(3, scope.row)">撤回</a>
            </template>
            <template v-if="isToMe">
              <template v-if="scope.row.rstatus === 1">
                <a href="javascript:" class="color-success" @click="doOption(1, scope.row)">同意</a>
                <a href="javascript:" class="color-error" @click="doOption(2, scope.row)">拒绝</a>
              </template>
              <template v-else-if="scope.row.rstatus === 5">
                <a href="javascript:" class="color-success" @click="doOption(4, scope.row)">打款</a>
                <a href="javascript:" class="color-error" @click="doOption(2, scope.row)">拒绝</a>
              </template>
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
        :page-size="pageSize"
        background
        layout="prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="报销详情"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      top="10px"
      width="500px"
      :before-close="beforeClose">
      <template v-if="currentChooseItem">
        <detail
          :visible="dialogVisible"
          :item="currentChooseItem"
        />
        <span slot="footer" class="dialog-footer">
          <template v-if="isFromMe">
              <a href="javascript:" v-if="currentChooseItem.rstatus === 1" class="color-error" @click="doOption(3)">撤回</a>
            </template>
          <template v-if="isToMe">
            <template v-if="currentChooseItem.rstatus === 1">
              <el-button type="success" @click="doOption(1)" size="small">同 意</el-button>
              <el-button type="danger" @click="doOption(2)" size="small">拒 绝</el-button>
            </template>
            <template v-else-if="currentChooseItem.rstatus === 5">
               <el-button type="primary" @click="doOption(4)" size="small">打 款</el-button>
               <el-button type="danger" @click="doOption(2)" size="small">拒 绝</el-button>
            </template>
          </template>
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
  import {PAY_TYPE, BX_STATUS, PAY_WAY} from '../constant'

  export default {
    name: 'money-system-list',

    data() {
      return {
        payType: PAY_TYPE,
        tableWrapHeight: this.wrapHeight - 110,
        dialogVisible: false,
        currentChooseItem: null,
        listData: [],
        bxStatus: BX_STATUS,
        payWay: PAY_WAY,

        // 筛选条件
        listType: 0,
        listPayWay: '',
        listPayType: [],
        listTime: [],
        listKeyword: '',
        listBxStatus: '',
        listBxDept: [],
        listBxUser: [],

        currentPage: 1,
        pageSize: 20,
        total: 0
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
        this.listPayWay = ''
      },

      handleSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val
        this.getExpenseList()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.getExpenseList()
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
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          listType: this.isFromMe ? 1 : this.isToMe ? 2 : 3, // 1 我发起的 2 我收到的 3 统计列表
          payType: JSON.stringify(this.listPayType), // 支出类别 [1, 2]
          createTimeBetween: JSON.stringify(createTimeBetween),  // 筛选时间段 - [开始时间, 结束时间]
          expenseDept: JSON.stringify(expenseDept),  // 报销部门  [2]
          expenseUserId: JSON.stringify(expenseUserId), // 报销人 [1]
          keyword: this.listKeyword,      // 关键字
          payWay: this.listPayWay,
          expenseStatus: this.listBxStatus // 报销状态
        }).then(data=> {
          this.total = data.length
          this.listData = data.list.map(item => {
            return {
              ...item,
              createTime: this.$utils.formatTime(item.createTime),
              payTime: this.$utils.formatTime(item.payTime),
              statusItem: BX_STATUS.find(x => Number(x.value) === Number(item.status))
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
            this.$msgbox.confirm('确定要撤回吗？').then(() => {
              _do.call(this, { status: 8 })
            })
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
            let msg = options.status === 3
              ? '同意'
              : options.status === 4
                ? '拒绝'
                : options.status === 3
                  ? '撤回'
                  : '打款'
            this.$message.success(`${msg}成功`)
            this.dialogVisible = false

            // reset
            this.getExpenseList()
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
      },

      formatListDeptUser() {
        const hasDept = this.listBxDept.length > 0
        const hasUser = this.listBxUser.length > 0
        return hasDept || hasUser ?
          this.listBxDept.map(x => x.label.replace(` (${x.userNum})`, '')).concat(this.listBxUser.map(x => x.name)).join('、')
          : '请选择'
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
      width: 194px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .search__wrap-date {
    width: 480px;
  }
</style>
