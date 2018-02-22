<template>
  <div class="annous width-100 height-100 bg-fff position-r">
    <div class="px-line-50 color-c666 bd-gray-lighter-b">
      <div
        :class="`px-width-100 text-center px-font-16 ib-middle cursor-p ${currentTab === 1 ? 'annous__tab-curr' : ''}`"
        @click="changeTab(1)">我发出的</div>
      <div
        :class="`px-width-100 text-center px-font-16 ib-middle cursor-p ${currentTab === 2 ? 'annous__tab-curr' : ''}`"
        @click="changeTab(2)">我收到的</div>
      <div class="fr px-margin-r20">
        <el-button type="danger" size="mini" @click="addAnnous()">新建公告</el-button>
      </div>
    </div>

    <div class="position-a px-top-50 bottom-0 width-100 overflow-a px-margin-t10 px-padding-lr10">
      <div class="annous__item bd-gray-lighter" v-for="item in list">
        <p class="annous__item-title">{{item.title}}</p>
        <div class="px-font-12 color-c999">
          <p>
            <span>发布者：</span>
            <span>{{item.pubUser.name}}</span>
          </p>
          <p>
            <span>发布时间：</span>
            <span>{{item.pubTime}}</span>
          </p>
          <p>
            <span>接收人：</span>
            <span>{{item.receiveUser | formatReceiveUser}}</span>
          </p>
          <p class="annous__item-content">
            <span>公告内容：</span>
            <span class="color-c666">{{item.content}}</span>
          </p>
        </div>
        <div class="px-padding-t10 text-right">
          <el-button size="mini" @click="lookDetail(item)">查看详情</el-button>
          <el-button size="mini" @click="chAnnous(item)" v-if="item.status === 1">撤回</el-button>
          <el-button type="danger" size="mini" @click="publish(item)" v-else>发布</el-button>
          <el-button size="mini" @click="delAnnous(item)">删除</el-button>
        </div>
      </div>
    </div>

    <div
      v-if="currentDetail || showAddPanel"
      class="annous__detail-panel position-f top-0 bottom-0 right-0 bg-fff bd-ccc-l">
      <div class="annous__detail-title px-line-40 bg-f2 text-center position-r">
        <div class="position-a height-100 px-width-40 cursor-p" @click="closeDetailPanel">
          <i class="el-icon-close"></i>
        </div>
        <span>{{currentDetail ? '公告详情' : '新建公告'}}</span>
      </div>
      <div class="position-a px-top-40 bottom-0 width-100 overflow-a px-padding-10">
        <template v-if="showAddPanel">
          <add-annous>
          </add-annous>
        </template>
        <template v-else-if="currentDetail.status === 1">
          <p class="px-font-24">{{currentDetail.title}}</p>
          <p class="color-c999">
            <span class="ib-middle">发布者：{{currentDetail.pubUser.name}}</span>
            <span class="ib-middle px-margin-l20">发布时间：{{currentDetail.pubTime}}</span>
            <span class="ib-middle px-margin-l20">接收人：{{currentDetail.receiveUser | formatReceiveUser}}</span>
          </p>
          <div class="px-padding-tb10 bd-gray-lighter-t px-margin-t10">
            {{currentDetail.content}}
          </div>
        </template>
        <template v-else>
          <div class="annous__detail-ych">
            <i class="el-icon-news"></i>
            <p>发布者已撤回该公告</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  // import resource from '../resource'
  import AddAnnous from './AddAnnous'
  import http from '../mixins/http'

  export default {
    components: {
      AddAnnous
    },
    name: 'annous',
    mixins: [http],
    data() {
      return {
        list: [],
        currentDetail: null,
        currentTab: 1,
        showAddPanel: false
      }
    },
    created() {
      this.getList()
    },
    filters: {
      formatReceiveUser(arr) {
        return arr.map(x=> x.name).join('、')
      }
    },
    methods: {
      getList() {
        this.http('getAnnous', {
          currentPage: 1,
          pageSize: 10
        }).then(res=> {
          this.list = res
        })
      },
      lookDetail(item) {
        this.currentDetail = item
      },
      closeDetailPanel() {
        this.currentDetail = null
        this.showAddPanel = false
      },
      delAnnous(item) {
        this.$msgbox.confirm('确定要删除该条公告吗').then(()=> {

        })
      },
      chAnnous(item) {
        this.$msgbox.confirm('确定要撤回该条公告吗').then(()=> {

        })
      },
      publish(item) {

      },
      changeTab(tab) {
        this.currentTab = tab
      },
      addAnnous() {
        this.currentDetail = null
        this.showAddPanel = true
      }
    }
  }
</script>

<style lang="scss">
  .annous__tab-curr {
    border-bottom: 2px red solid;
  }
  .annous__item {
    float: left;
    width: 300px;
    background-color: #fff;
    padding: 10px;
    border-radius: 3px;
    margin: 0 15px 15px 0;
  }
  .annous__item-title {
    font-size: 16px;
    color: #000;
  }
  .annous__detail-panel {
    width: 600px;
    z-index: 3000;
  }
  .annous__detail-ych {
    text-align: center;
    padding-top: 200px;
    color: #aaa;
    font-size: 16px;
    i {
      font-size: 40px;
    }
  }
</style>
