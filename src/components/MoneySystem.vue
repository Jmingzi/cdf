<template>
  <div class="expense width-100 height-100 bg-fff overflow-a">
    <div class="px-padding-10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-edit"></i> 填写申请</span>
          <money-system-apply
            :process="process">
          </money-system-apply>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-sort-up"></i> 我发起的</span>
          <money-system-list>
          </money-system-list>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label"><i class="el-icon-sort-down"></i> 我收到的</span>
          <money-system-list>
          </money-system-list>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label"><i class="el-icon-tickets"></i> 统计</span>
          <money-system-list>
          </money-system-list>
        </el-tab-pane>
        <el-tab-pane name="five">
          <span slot="label"><i class="el-icon-setting"></i> 流程配置</span>
          <money-system-setting>
          </money-system-setting>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import MoneySystemApply from './MoneySystemApply'
  import MoneySystemList from './MoneySystemList'
  import MoneySystemSetting from './MoneySystemSetting'
  import http from '../mixins/http'

  export default {
    name: 'money-system',
    mixins: [http],
    data() {
      return {
        activeName: 'first',
        process: []
      }
    },
    created() {
      this.http('getProcess', { userId: 1, deptId: 2 }).then(res=> {
        this.process = res
      })
    },
    components: {
      MoneySystemApply,
      MoneySystemList,
      MoneySystemSetting
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event)
      }
    }
  }
</script>

<style lang="scss">
  .el-tabs__item.is-active {
    color: #f56c6c;
  }
  .el-tabs__active-bar {
    background-color: #f56c6c;
  }
</style>
