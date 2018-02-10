import resource from '../resource'

export default {
  data() {
    return {
    }
  },

  methods: {
    http(uri, data) {
      let loadingService = this.$loading({
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      return new Promise((resolve, reject)=> {
        resource[uri](data).then(res=> {
          loadingService.close()

          if (res.code === 200) {
            resolve(res.data)
          } else if (res.code === 601) {
            // login invalid
            this.$router.push('/login')
          } else {
            this.$message(error.msg)
            reject(res)
          }
        }).catch(error=> {
          loadingService.close()
          this.$message(error.msg || 'net work error')
          reject(error)
        })
      })
    }
  }
}


