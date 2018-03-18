<template>
  <div class="expense width-100 height-100 bg-fff overflow-a" ref="expense">
    <div class="px-padding-10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-edit"></i> 填写申请</span>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-sort-up"></i> 我发起的</span>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label"><i class="el-icon-sort-down"></i> 我收到的</span>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label"><i class="el-icon-tickets"></i> 统计</span>
        </el-tab-pane>
        <el-tab-pane name="five">
          <span slot="label"><i class="el-icon-setting"></i> 流程配置</span>
        </el-tab-pane>
      </el-tabs>

      <money-system-apply
        v-if="userInfo && activeName === 'first'">
      </money-system-apply>
      <money-system-setting
        v-else-if="activeName === 'five'">
      </money-system-setting>
      <money-system-list
        v-else-if="wrapHeight"
        :wrap-height="wrapHeight"
        :active-name="activeName">
      </money-system-list>
    </div>
  </div>
</template>

<script>
  import MoneySystemApply from './MoneySystemApply'
  import MoneySystemList from './MoneySystemList'
  import MoneySystemSetting from './MoneySystemSetting'
  import http from '../mixins/http'
  import { mapState } from 'vuex'

  export default {
    name: 'money-system',
    mixins: [http],
    data() {
      return {
        activeName: 'first',
        wrapHeight: 0
      }
    },
    created() {

    },
    mounted() {
      this.wrapHeight = this.$refs.expense.getBoundingClientRect().height
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      MoneySystemApply,
      MoneySystemList,
      MoneySystemSetting
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event)
        // console.log(this.activeName)
      }
    }
  }
</script>

<style lang="scss">
  .expense {
    transform: translate3d(0,0,0);
  }
  .el-tabs__item.is-active {
    color: #f56c6c;
  }
  .el-tabs__active-bar {
    background-color: #f56c6c;
  }
</style>
