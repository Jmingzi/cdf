<template>
  <div class="annous width-100 height-100 bg-fff position-r">
    <div class="px-line-50 color-c666 bd-gray-lighter-b">
      <div
        :class="`px-width-100 text-center px-font-16 ib-middle cursor-p ${currentTab === 1 ? 'annous__tab-curr' : ''}`"
        @click="changeTab(1)">我发出的</div>
      <div
        :class="`px-width-100 text-center px-font-16 ib-middle cursor-p ${currentTab === 2 ? 'annous__tab-curr' : ''}`"
        @click="changeTab(2)">我收到的</div>
      <div class="fr px-margin-r20" v-if="otherPriv.annous">
        <el-button type="danger" size="mini" @click="addAnnous()">新建公告</el-button>
      </div>
    </div>

    <div class="position-a px-top-50 bottom-0 width-100 overflow-a px-padding-lr10">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, i) in dataList" :key="item.id">
          <template v-if="item.status === 0 && currentTab === 2">
            <p class="text-center px-padding-tb49">该公告已撤回</p>
          </template>
          <template v-else>
            <el-card class="box-card px-margin-t20">
              <div slot="header" class="clearfix">
                <p>{{item.title}}</p>
              </div>
              <div class="px-font-12 color-c999">
                <p>
                  <span>发布者：</span>
                  <span>{{item.pubUser.name}}</span>
                </p>
                <p>
                  <span>发布时间：</span>
                  <span>{{$utils.formatTime(item.pubTime)}}</span>
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
                <template v-if="currentTab === 1">
                  <el-button size="mini" @click="optAnnous(item, i, 0)" v-if="item.status === 1">撤回</el-button>
                  <el-button type="danger" size="mini" @click="optAnnous(item, i, 1)" v-else>发布</el-button>
                  <el-button size="mini" @click="optAnnous(item, i, 2)">删除</el-button>
                </template>
              </div>
            </el-card>
          </template>
        </el-col>
        <el-col :span="24" v-if="dataList.length === 0">
          <div class="text-center color-c999 px-padding-t100">
            <i class="el-icon-bell" style="font-size: 40px;"></i>
            <p class="px-padding-t20">暂无公告~</p>
          </div>
        </el-col>
      </el-row>
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
        <template v-else-if="currentTab === 1 || currentTab === 2 && currentDetail.status === 1">
          <p class="px-font-24">{{currentDetail.title}}</p>
          <p class="color-c999">
            <span class="ib-middle">发布者：{{ currentDetail.pubUser ? currentDetail.pubUser.name : '' }}</span>
            <span class="ib-middle px-margin-l20">发布时间：{{$utils.formatTime(currentDetail.pubTime)}}</span>
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
  import { mapGetters } from 'vuex'

  export default {
    components: {
      AddAnnous
    },
    name: 'annous',
    mixins: [http],
    data() {
      return {
        list: [],
        toMeList: [],
        fromMeList: [],
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
        return arr.map(x=> x ? x.name : '').join('、')
      }
    },
    computed: {
      ...mapGetters(['otherPriv']),

      dataList() {
        return this.currentTab === 1 ? this.fromMeList : this.toMeList
      }
    },
    methods: {
      getList() {
        this.http('getAnnous', {
          currentPage: 1,
          pageSize: 100
        }).then(res => {
          this.toMeList = res.reclist
          this.fromMeList = res.publist
        })
      },
      lookDetail(item) {
        this.currentDetail = item
      },
      closeDetailPanel() {
        this.currentDetail = null
        this.showAddPanel = false
      },
      optAnnous(item, index, status) {
        const txt = ['撤回', '发布', '删除']
        this.$msgbox.confirm(`确定要${txt[status]}该条公告吗`).then(()=> {
          this.http('optAnnous', { id: item.nid, status }).then(() => {
            this.$message.success(`${txt[status]}成功`)
            const data = this[this.currentTab === 1 ? 'fromMeList' : 'toMeList']
            if (status === 2) {
              data.splice(index, 1)
            } else {
              this.$set(
                data,
                index,
                { ...data[index], status: 0 }
              )
            }
          })
        })
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
    z-index: 2000;
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
  .px-padding-tb49 {
    padding: 49px 0;
  }
</style>
