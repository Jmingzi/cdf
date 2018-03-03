<template>
  <div class="list">
    <div class="position-f px-left-10 px-right-10 px-top-60 px-bottom-50 overflow-a">
      <el-table
        :data="listData"
        border
        :height="tableWrapHeight"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
      <div class="expense-detail">
        <div class="detail-item">
          <span class="text-right color-c999">报销状态：</span>
          <span class="color-warning">审批中</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">报销事由：</span>
          <span>反而你回家给人体韩国和投入 </span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">报销金额：</span>
          <span>1000.00元</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">支出类别：</span>
          <span>办公室/硬件</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">支出方式：</span>
          <span>支付宝</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">支出时间：</span>
          <span>2018年3月3日 11:14:45</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">报销部门：</span>
          <span>技术部</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999">报销时间：</span>
          <span>2018年3月3日 11:15:29</span>
        </div>
        <div class="detail-item">
          <span class="text-right color-c999 ib-top">相关图片：</span>
          <div class="ib-top">
            <a class="ib-middle px-margin-10" href="https://avatars0.githubusercontent.com/u/9743418?s=460&v=4" target="_blank">
              <img src="https://avatars0.githubusercontent.com/u/9743418?s=460&v=4" width="70" height="70">
            </a>
            <a class="ib-middle px-margin-10" href="https://avatars0.githubusercontent.com/u/9743418?s=460&v=4" target="_blank">
              <img src="https://avatars0.githubusercontent.com/u/9743418?s=460&v=4" width="70" height="70">
            </a>
          </div>
        </div>
        <p class="px-margin-t20">报销流程</p>
        <div class="px-margin-t10 bg-f2 px-padding-10">
          <span class="ib-middle px-margin-r10">我</span>
          <span class="ib-middle px-margin-r10 color-success">发起申请</span>
          <span class="fr color-c999">2018年3月3日 11:23:09</span>
        </div>
        <div class="px-margin-t10 bg-f2 px-padding-10">
          <span class="ib-middle px-margin-r10">杨明 (总经理)</span>
          <span class="ib-middle px-margin-r10 color-success">已同意</span>
          <span class="fr color-c999">2018年3月3日 11:23:09</span>
          <p>
            <span class="color-c999">同意意见：</span>
            <span>烦呢我看和伏尔加河顾客和狗头人</span>
          </p>
        </div>
        <div class="px-margin-t10 bg-f2 px-padding-10">
          <span class="ib-middle px-margin-r10">老柴 (老板)</span>
          <span class="ib-middle px-margin-r10 color-warning">审批中</span>
        </div>
        <div class="px-margin-t10 bg-f2 px-padding-10">
          <span class="ib-middle px-margin-r10">牛逼 (董事长)</span>
          <span class="ib-middle px-margin-r10 color-c999">待审批</span>
        </div>
        <div class="px-margin-t10 bg-f2 px-padding-10">
          <span class="ib-middle px-margin-r10">小芳 (财务)</span>
          <span class="ib-middle px-margin-r10 color-c999">待打款</span>
        </div>
      </div>
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
  export default {
    name: 'money-system-list',

    data() {
      return {
        tableWrapHeight: 0,
        currentPage: 1,
        dialogVisible: false,
        currentChooseItem: null,
        listData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },

    watch: {
      wrapHeight(val) {
        this.tableWrapHeight = val - 110
        return val
      }
    },

    mounted() {
      // console.log(this.wrapHeight)
      // this.tableWrapHeight = this.$parent.$refs.expense.getBoundingClientRect().height
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
    }
  }
</script>

<style lang="scss">

</style>
