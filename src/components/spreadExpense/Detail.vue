<template>
  <div class="expense-detail" v-if="detail">
    <div class="detail-item">
      <span class="text-right color-c999">报销状态：</span>
      <span class="color-warning">{{detail.statusText}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">说明：</span>
      <span>{{detail.desc}} </span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">平台：</span>
      <span>{{detail.plantform | formatPlateForm}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">充值金额：</span>
      <span>{{detail.money}}元</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">项目：</span>
      <span>{{detail.project}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">对接人：</span>
      <span>{{detail.contName}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">对接人手机号：</span>
      <span>{{detail.phone}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">对接人微信：</span>
      <span>{{detail.wx}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">对接人qq：</span>
      <span>{{detail.qq}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">对接人公司：</span>
      <span>{{detail.company}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">报销部门：</span>
      <span>{{detail.label}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">报销时间：</span>
      <span>{{$utils.formatTime(detail.createTime)}}</span>
    </div>

    <p class="px-margin-t20">申报明细</p>
    <el-table
      :data="detail.items"
      style="width: 100%;">
      <el-table-column
        prop="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="140">
      </el-table-column>
      <el-table-column
        prop="money"
        label="消费金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="project"
        label="项目"
        width="100">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="说明">
      </el-table-column>
      <el-table-column
        label="截图">
        <template slot-scope="scope">
          <a v-for="(x, i) in scope.row.images" :href="x.url" target="_blank" class="ib-middle px-margin-r5">截图{{i + 1}}</a>
        </template>
      </el-table-column>
    </el-table>

    <template v-if="detail.items.length === 0">
      <p class="px-margin-t20">报销流程</p>
      <div class="process__wrap position-r">
        <div class="process__item position-r" v-for="item in detail.process">
          <p :class="`process__state ${item.processColor}`">
            <span class="ib-middle px-margin-r5">{{item.name}}<span v-if="item.job">({{item.job}})</span></span>
          </p>
          <div class="process__info text-right bg-f2 cl">
            <span :class="`fl ${item.processColor}`">{{item.processText}}</span>
            <span class="color-c999">{{$utils.formatTime(item.time)}}</span>
            <p class="text-left" v-if="item.desc">
              <span class="color-c999">意见：</span>
              <span>{{item.desc}}</span>
            </p>
          </div>
          <div class="position-a process__item-icon">
            <i :class="item.processIcon + ' ' + item.processColor"></i>
          </div>
        </div>
        <div class="process_line position-a"></div>
      </div>
    </template>
  </div>
</template>

<script>
  import http from '../../mixins/http'
  import { BX_STATUS, SPREAD_PROJECT, SPREAD_PLATE } from "../../constant"

  export default {
    name: 'money-system-detail',

    data() {
      return {
        detail: null,
        BX_STATUS
      }
    },

    watch: {
      item: function (obj) {
        return obj
      }
    },

    filters: {
      formatPlateForm(plate) {
        return SPREAD_PLATE.find(x => x.value === Number(plate)).label
      },
    },

    props: ['item'],

    mixins: [http],

    created() {
      this.getDetail()
    },

    methods: {
      formatProject(project) {
        return SPREAD_PROJECT.find(x => x.value === Number(project)).label
      },

      getDetail() {
        this.http('getSpreadDetail', { expenseId: this.item.id }).then(res => {
          res.items = res.items.map((x, i) => {
            return {
              ...x,
              project: this.formatProject(x.project),
              date: this.$utils.formatTime(x.date),
              index: i + 1
            }
          })
          res.statusText = BX_STATUS.find(x => Number(x.value) === Number(res.status)).label
          res.project = res.project.map(id => SPREAD_PROJECT.find(x => x.value === Number(id)).label).join('、')
          res.process = res.process.map(item => {
            const y = BX_STATUS.find(x => Number(x.value) === Number(item.status))
            return {
              ...item,
              processIcon: y.icon,
              processColor: y.color,
              processText: y.label
            }
          })
          this.detail = res
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
