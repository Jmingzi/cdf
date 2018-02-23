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
  import { mapState } from 'vuex'
  import { menu } from '../constant'

  export default {
    data() {
      return {
        currentView: ''
      }
    },

    created() {
      let queryId = this.$route.query.menuId
      this.menuChange(queryId ? Number(queryId) : 0)
    },

    computed: {
      ...mapState(['currMenuId'])
    },

    methods: {
      menuChange(menuId) {
        let item = menu.find(x => x.id === menuId)
        this.currentView = item.componentName
      }
    },

    components: {
      CommonFrame,
      Home,
      Annous,
      DeptUser,
      Priv,
      MoneySystem,
      Job
    }
  }
</script>
