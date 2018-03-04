<template>
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
    <div class="process__wrap position-r">
      <div class="process__item position-r">
        <p class="process__state color-success">
          <span class="ib-middle px-margin-r5">我</span>
          <span class="ib-middle">发起申请</span>
        </p>
        <p class="process__info text-right bg-f2 cl">
          <span class="fl">我</span>
          <span class="color-c999">2018年3月3日 11:23:09</span>
        </p>
        <div class="position-a process__item-icon">
          <i class="el-icon-circle-check color-success"></i>
        </div>
      </div>
      <div class="process__item position-r">
        <p class="process__state color-success">
          <span class="ib-middle px-margin-r5">总经理</span>
          <span class="ib-middle">已同意</span>
        </p>
        <div class="process__info bg-f2 cl">
          <span class="">杨明</span>
          <span class="fr color-c999">2018年3月3日 11:23:09</span>
          <p>
            <span class="color-c999">同意意见：</span>
            <span>烦呢我看和伏尔加河顾客和狗头人</span>
          </p>
        </div>
        <div class="position-a process__item-icon">
          <i class="el-icon-circle-check color-success"></i>
        </div>
      </div>
      <div class="process__item position-r">
        <p class="process__state color-warning">
          <span class="ib-middle px-margin-r5">老板</span>
          <span class="ib-middle">审批中</span>
        </p>
        <div class="process__info bg-f2 cl">
          <span class="">老柴</span>
          <!--<span class="fr color-c999">2018年3月3日 11:23:09</span>-->
        </div>
        <div class="position-a process__item-icon">
          <i class="el-icon-remove color-warning"></i>
        </div>
      </div>
      <div class="process__item position-r">
        <p class="process__state color-ccc">
          <span class="ib-middle px-margin-r5">董事长</span>
          <span class="ib-middle">待审批</span>
        </p>
        <div class="position-a process__item-icon">
          <i class="el-icon-remove color-ccc"></i>
        </div>
      </div>
      <div class="process__item position-r">
        <p class="process__state color-ccc">
          <span class="ib-middle px-margin-r5">财务</span>
          <span class="ib-middle">待打款</span>
        </p>
        <div class="position-a process__item-icon">
          <i class="el-icon-remove color-ccc"></i>
        </div>
      </div>
      <div class="process_line position-a"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'money-system-detail'
  }
</script>

<style lang="scss">

</style>
