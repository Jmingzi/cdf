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
    <div class="bd-gray-lighter-b px-padding-b15" v-for="(item, i) in detail.items">
      <p class="px-margin-t20">申报明细({{i + 1}})</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <span class="color-c999">日期: </span>
          <span>{{$utils.formatTime(item.date)}}</span>
        </el-col>
        <el-col :span="12">
          <span class="color-c999">消费金额: </span>
          <span>{{item.money}}</span>
        </el-col>
        <el-col :span="12">
          <span class="color-c999">项目: </span>
          <span>{{item.project | formatProject}}</span>
        </el-col>
        <el-col :span="12">
          <span class="color-c999">说明: </span>
          <span>{{item.desc}}</span>
        </el-col>
        <el-col :span="24">
          <div class="detail-item">
            <span class="text-right color-c999 ib-top">图片：</span>
            <div class="ib-top" v-if="item.images.length > 0">
              <a
                v-for="x in item.images"
                class="ib-middle px-margin-10" :href="x.url" target="_blank">
                <img :src="x.url" width="70" height="70">
              </a>
            </div>
            <span v-else>无</span>
          </div>
        </el-col>
      </el-row>
    </div>

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
      formatProject(project) {
        return SPREAD_PROJECT.find(x => x.value === Number(project)).label
      },

      formatPlateForm(plate) {
        return SPREAD_PLATE.find(x => x.value === Number(plate)).label
      }
    },

    props: ['item'],

    mixins: [http],

    created() {
      this.getDetail()
    },

    methods: {
      getDetail() {
        this.http('getSpreadDetail', { expenseId: this.item.id }).then(res => {
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
