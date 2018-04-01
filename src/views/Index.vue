<template>
  <common-frame @menuChange="menuChange">
    <component :is="currentView">
    </component>
  </common-frame>
</template>

<script>
  import CommonFrame from '../components/CommonFrame'
  import Home from '../components/Home'
  import Annous from '../components/Annous'
  import DeptUser from '../components/DeptUser'
  import Priv from '../components/Priv'
  import Job from '../components/Job'
  import MoneySystem from '../components/MoneySystem'
  import SpreadExpense from '../components/spreadExpense/Index'
  import { mapState, mapMutations } from 'vuex'
  import { menu } from '../constant'
  import http from '../mixins/http'

  export default {
    data() {
      return {
        currentView: ''
      }
    },
    mixins: [http],
    created() {
      let queryId = this.$route.query.menuId
      this.menuChange(queryId ? Number(queryId) : 0)
      this.getUserInfo()
    },

    computed: {
      ...mapState(['currMenuId', 'userInfo'])
    },

    methods: {
      ...mapMutations(['setState']),

      menuChange(menuId) {
        // if (this.userInfo && this.userInfo.menuPriv.includes(menuId)) {
        if (this.userInfo) {
          let item = menu.find(x => x.id === menuId)
          this.currentView = item.componentName
        } else {
          this.currentView = 'Home'
        }
      },

      getUserInfo() {
        if (this.userInfo) {
          return void 0
        }

        this.http('getInfos').then(value=> {
          value.menuPriv = value.menuPriv.map(x => Number(x))
          value.contactPriv = value.contactPriv.map(x => Number(x))

          this.setState({
            key: 'userInfo',
            value
          })
        })
      }
    },

    components: {
      CommonFrame,
      Home,
      Annous,
      DeptUser,
      Priv,
      MoneySystem,
      Job,
      SpreadExpense
    }
  }
</script>
