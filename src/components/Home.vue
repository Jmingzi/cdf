<template>
  <div class="home">
    <div>home</div>
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
