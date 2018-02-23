<template>
  <div class="job height-100 bg-fff position-r">
    <div class="px-line-50 px-padding-lr10 bd-gray-lighter-b">
      <el-button type="danger" size="mini">添加岗位</el-button>
      <template v-if="currJob">
        <el-button type="info" size="mini">编辑岗位</el-button>
        <el-button type="info" size="mini">添加人员</el-button>
      </template>
    </div>
    <div class="job__list position-a px-top-50 bottom-0 bd-gray-lighter-r overflow-a">
      <p class="px-line-40 text-center color-c999">岗位列表</p>
      <div
        v-for="item in jobList"
        @click="currJob = item"
        :key="item.id"
        :class="`bd-gray-lighter-b px-line-40 px-padding-lr10 cursor-p ${currJob.id === item.id ? 'curr' : ''}`">
        {{item.name}}
        <span class="fr el-icon-arrow-right color-ccc px-margin-t15"></span>
      </div>
    </div>
    <div class="job__user position-a px-top-50 bottom-0 right-0">
      <div class="bd-gray-lighter-b">
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">人员列表</div>
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">所属部门</div>
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">操作</div>
      </div>
      <div
        v-if="currJob && currJob.users.length > 0"
        class="bd-gray-lighter-b"
        v-for="user in currJob ? currJob.users : []">
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">{{user.name}}</div>
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">{{user.deptName}}</div>
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">
          <a href="">删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../mixins/http'

  export default {
    name: 'job',
    data() {
      return {
        jobList: [],
        currJob: null
      }
    },
    mixins: [http],
    created() {
      this.getJobList()
    },
    methods: {
      getJobList() {
        this.http('jobList').then(res=> {
          if (res.length > 0) {
            this.jobList = res
            this.currJob = res[0]
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .job__list {
    width: 200px;
    .curr {
      background-color: #f2f2f2;
    }
  }
  .job__user {
    left: 200px;
  }
</style>
