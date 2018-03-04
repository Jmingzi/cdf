<template>
  <div class="list">
    <div class="position-f px-left-10 px-right-10 px-top-60 px-bottom-50 overflow-a">
      <div v-if="isTotal">
        <div class="fr">
          <el-button type="danger">搜索查询</el-button>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">报销人</span>
          <div class="ib-middle">
            <el-input placeholder="请输入">
            </el-input>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">报销金额</span>
          <div class="ib-middle">
            <el-input placeholder="请输入">
            </el-input>
          </div>
        </div>
        <div class="search__wrap ib-middle">
          <span class="ib-middle">支出类别</span>
          <div class="ib-middle">
            <el-cascader
              expand-trigger="hover"
              :options="payType">
            </el-cascader>
          </div>
        </div><br>
        <div class="search__wrap search__wrap-date ib-middle">
          <span class="ib-middle">报销发起时间</span>
          <div class="ib-middle">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="search__wrap search__wrap-dept ib-middle">
          <span class="ib-middle">报销部门或人</span>
          <div class="ib-middle dept">
            <span class="color-info">请选择</span>
          </div>
        </div>
      </div>

      <el-table
        :data="listData"
        border
        show-summary
        :height="tableWrapHeight"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="报销人"
          width="80">
        </el-table-column>
        <el-table-column
          prop="money"
          label="报销金额"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="报销时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支出类别"
          width="140">
        </el-table-column>
        <el-table-column
          prop="expenseDept"
          label="报销部门"
          width="80">
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="支出时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="way"
          label="支出方式">
        </el-table-column>
        <el-table-column
          label="操作"
          :width="isFromMe ? 90 : 150">
          <template slot-scope="scope">
            <el-button @click="doOption(0, scope.row)" type="text" size="small">查看</el-button>
            <a href="javascript:" class="color-error" v-if="isFromMe" @click="doOption(3, scope.row)">撤回</a>
            <template v-else-if="isToMe">
              <a href="javascript:" class="color-success" @click="doOption(1, scope.row)">同意</a>
              <a href="javascript:" class="color-error" @click="doOption(2, scope.row)">拒绝</a>
            </template>
            <template v-else>
              <a href="javascript:" class="color-success" @click="doOption(4, scope.row)">打款</a>
              <a href="javascript:" class="color-error" @click="doOption(5, scope.row)">撤销打款</a>
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
      :modal="false"
      top="10px"
      width="500px">
      <detail>
      </detail>
      <span slot="footer" class="dialog-footer">
        <template v-if="isToMe">
          <el-button type="success" @click="doOption(1)" size="small">同 意</el-button>
          <el-button type="danger" @click="doOption(2)" size="small">拒 绝</el-button>
        </template>
        <el-button v-else-if="isFromMe" type="danger" @click="doOption(3)" size="small">撤 回</el-button>
        <el-button v-else-if="isTotal" type="primary" @click="doOption(4)" size="small">打 款</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Detail from './MoneySystemDetail'
  import http from '../mixins/http'
  import {PAY_TYPE} from '../constant'

  export default {
    name: 'money-system-list',

    data() {
      return {
        payType: PAY_TYPE,
        tableWrapHeight: 0,
        currentPage: 1,
        dialogVisible: false,
        currentChooseItem: null,
        listData: []
      }
    },

    mixins: [http],

    watch: {
      wrapHeight(val) {
        this.tableWrapHeight = val - 110 - 110
        return val
      }
    },

    mounted() {
      this.getExpenseList()
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getExpenseList() {
        this.http('getExpenseList', {
          currentPage: 1,
          pageSize: 10,
          listType: 1, // 1 我发起的 2 我收到的 3 统计列表
          payType: [], // 支出类别
          createStartTime: '',  // 筛选时间段 - 开始时间
          createEndTime: '',  // 筛选时间段 - 结束时间
          expenseDept: '',  // 报销部门
          expenseUserId: '' // 报销人
        }).then(data=> {
          this.listData = data
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
            this.$msgbox.prompt('请输入同意意见(非必填)')
          } break
          case 2: {
            this.$msgbox.prompt('请输入拒绝意见(非必填)')
          } break
          case 3: {
            this.$msgbox.confirm('确定要撤回吗？')
          } break
          case 4: {
            this.$msgbox.confirm('即将打款金额为90.00元给杨明，确定要继续吗？')
          } break
          case 5: {
            this.$msgbox.confirm('确定要撤销打款吗？')
          } break
        }
      }
    },

    props: {
      type: {
        type: Number,
        default: 1
      },
      wrapHeight: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isFromMe() {
        return this.type === 1
      },
      isToMe() {
        return this.type === 2
      },
      isTotal() {
        return this.type === 3
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
    width: 350px;
    .dept {
      width: 250px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .search__wrap-date {
    width: 450px;
  }

  .expense .el-table__header {
    th, tr {
      background-color: #f5f7fa;
    }
  }
</style>
