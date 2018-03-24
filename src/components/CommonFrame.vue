<template>
  <div class="wrap-common position-a top-0 bottom-0 width-100 bg-f2">
    <div class="header px-line-50 px-height-50 bg-fff">
      <div class="left position-a left-0 top-0 height-100">
        <p class="px-font-20 color-fff text-center">相源科技</p>
      </div>
      <div class="right position-a top-0 height-100 right-0 text-right">
        <div class="display-ib top-hover px-padding-lr20 cursor-p" @click="logOut">
          <span>退出登录</span>
        </div>
      </div>
    </div>
    <div class="left-aside position-a px-top-50 bottom-0">
      <div class="user color-fff cl px-padding-15" v-if="userInfo">
        <img :src="`http://oa.ixunle.com/upload/icon/${userInfo.avatarUrl}`" class="px-width-50 px-height-50 avatar fl">
        <p class="px-margin-t5">{{userInfo.name}}</p>
        <p class="px-font-12 color-aaa">{{userInfo.dept.name}}</p>
      </div>
      <ul class="color-fff">
        <li
          v-for="item in menu"
          @click="setMenu(item)"
          :key="item.id"
          :class="`px-line-45 px-padding-lr15 cursor-p ${currentMenuId === item.id ? 'active' : ''}`">
          <i :class="item.icon + ' color-aaa'"></i>
          <i class="el-icon-caret-right fr px-margin-t15 color-aaa"></i>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="right-aside position-a right-0 px-top-50 bottom-0 px-padding-15">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { menu } from '../constant'
  import cookie from 'js-cookie'

  export default {
    data() {
      return {
        menu
      }
    },

    watch: {
      currentMenuId: function (nV, oV) {
        this.$emit('menuChange', nV)
        return nV
      }
    },

    computed: {
      ...mapState(['currMenuId', 'userInfo']),

      currentMenuId() {
        let { menuId } = this.$route.query
        return menuId ? Number(menuId) : this.currMenuId
      }
    },

    methods: {
      ...mapMutations(['setState']),

      setMenu(item) {
        this.setState({
          key: 'currMenuId',
          value: item.id
        })
        this.$router.replace('/?menuId=' + item.id)
      },

      logOut() {
        cookie.remove('_token')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
  .wrap-common {
    $w: 220px;
    .header {
      .left {
        width: $w;
        background-color: #283744;
      }
      .right {
        left: $w;
      }
    }
    .left-aside {
      width: $w;
      background-color: #39435C;
    }
    .right-aside {
      left: $w;
    }

    .user {
      .avatar {
        // border: 1px #fff solid;
        border-radius: 25px;
        margin-right: 20px;
      }
    }

    ul {
      li {
        border-bottom: 1px solid #425164;
        &.active {
          background-color: #425164;
        }
      }
    }

    .top-hover {
      &:hover {
        color: #fff;
        background-color: #39435C;
      }
    }
  }
</style>
