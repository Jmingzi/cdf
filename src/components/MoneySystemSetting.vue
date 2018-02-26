<template>
  <div class="setting">
    <div class="px-padding-tb50 text-center" v-if="setting.process.length === 0 && !isNewProcess">
      <p class="px-margin-b20 color-c666">你还没有配置流程哦~</p>
      <el-button type="danger" @click="isNewProcess = true">新建流程</el-button>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  import http from '../mixins/http'
  import { mapState } from 'vuex'

  export default {
    name: 'money-system-setting',
    created() {
      if (this.isActive) {
        this.getSetting()
      }
    },
    data() {
      return {
        setting: {
          process: []
        },
        isNewProcess: false
      }
    },
    mixins: [http],
    watch: {
      isActive(val) {
        if (val) {
          this.getSetting()
        }
        return val
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      getSetting() {
        this.http('getSetting', {
          userId: this.userInfo.userId,
          deptId: this.userInfo.dept.id
        }).then(res=> {

        })
      }
    },
    props: {
      isActive: false
    }
  }
</script>

<style lang="scss">

</style>
