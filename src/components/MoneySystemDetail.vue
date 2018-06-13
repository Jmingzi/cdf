<template>
  <div class="expense-detail" v-if="detail">
    <div class="detail-item">
      <span class="text-right color-c999">报销状态：</span>
      <span class="color-warning">{{detail.statusText}}</span>
    </div>
    <div class="detail-item px-margin-tb10">
      <span class="text-right color-c999 ib-top">报销事由：</span>
      <span class="ib-top break-all" style="width: 355px" v-html="formatBr(detail.desc)"></span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">报销金额：</span>
      <span class="color-error font-bold">{{detail.money}}元</span>
    </div>
    <div class="detail-item px-margin-tb10">
      <span class="text-right color-c999 ib-top px-width-70">收款人：</span>
      <span class="ib-top break-all" style="width: 355px" v-html="formatBr(detail.payee)"></span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">支出类别：</span>
      <span>{{detail.payType.join('/')}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">支出方式：</span>
      <span>{{detail.way}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">支出时间：</span>
      <span>{{$utils.formatTime(detail.payTime)}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">报销部门：</span>
      <span>{{detail.label}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999">报销时间：</span>
      <span>{{$utils.formatTime(detail.createTime, 1)}}</span>
    </div>
    <div class="detail-item">
      <span class="text-right color-c999 ib-top px-width-70">相关图片：</span>
      <div class="ib-top" style="width: 355px" v-if="detail.images.length > 0">
        <a
          v-for="item in detail.images"
          class="ib-middle px-margin-10" :href="item.url" target="_blank">
          <img :src="item.url" width="70" height="70">
        </a>
      </div>
      <span v-else>无</span>
    </div>
    <p class="px-margin-t20">报销流程</p>
    <div class="process__wrap position-r">
      <div class="process__item position-r" v-for="(item, i) in detail.process">
        <p :class="`process__state ${item.processColor}`">
          <span class="ib-middle px-margin-r5">{{item.name}}<span v-if="item.job">({{item.job}})</span></span>
        </p>
        <div class="process__info text-right bg-f2 cl">
          <span :class="`fl ${item.processColor}`">{{item.processText}}</span>
          <span class="color-c999">{{$utils.formatTime(item.time, 1)}}</span>
          <p class="text-left" v-if="item.desc">
            <span class="color-c999">意见：</span>
            <span>{{item.desc}}</span>
          </p>
        </div>
        <div class="position-a process__item-icon">
          <i :class="item.processIcon + ' ' + item.processColor"></i>
        </div>

        <div class="empty-fff" v-if="i === detail.process.length - 1"></div>
      </div>
      <div class="process_line position-a"></div>
    </div>
  </div>
</template>

<script>
  import http from '../mixins/http'
  import { BX_STATUS } from "../constant"

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
      },
      visible(val) {
        if (val) {
          this.getDetail()
        } else {
          this.detail = null
        }
      }
    },

    props: ['item', 'visible'],

    mixins: [http],

    created() {
      this.getDetail()
    },

    methods: {
      formatBr(str) {
        return `<div style="white-space: pre-wrap;">${str || ''}</div>`
      },

      getDetail() {
        this.http('getExpenseDetail', { expenseId: this.item.id }).then(res => {
          res.statusText = BX_STATUS.find(x => Number(x.value) === Number(res.status)).label
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
  .empty-fff {
    position: absolute;
    top: 18px;
    bottom: 0;
    left: -30px;
    width: 20px;
    background-color: #fff;
    z-index: 111;
  }
</style>
