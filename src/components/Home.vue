<template>
  <div class="home height-100 bg-fff">
    <div class="cl bd-gray-lighter-b">
      <iframe class="fr" allowtransparency="true" frameborder="0" width="410" height="98" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=0&d=2&bd=0&k=&f=808080&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=58321&w=410&h=98&align=center"></iframe>
      <p class="px-padding-t40 px-margin-l20">清早的晨曦是我的问候，愿你幸福多彩！</p>
    </div>

    <div class="text-center px-margin-50">
      <div
        @click="$router.push('/?menuId=3')"
        class="hover px-width-100 px-height-100 fl bd-gray-lighter px-padding-t20 px-margin-r50 cursor-p"
      >
        <i class="el-icon-printer px-font-32"></i>
        <p class="px-margin-t5">我的报销</p>
      </div>

      <div
        @click="$router.push('/?menuId=2')"
        class="hover px-width-100 px-height-100 fl bd-gray-lighter px-padding-t20 cursor-p px-margin-r50"
      >
        <i class="el-icon-bell px-font-32"></i>
        <p class="px-margin-t5">我的公告</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    created() {
      this.notice()
    },
    watch: {
      userInfo(v) {
        if (v) {
          this.notice()
        }
        return v
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },

    methods: {
      notice() {
        if (this.userInfo && this.userInfo.is_update === -1) {
          this.$msgbox.alert('当前密码不安全，建议修改密码')
        }
      }
    }
  }
</script>
