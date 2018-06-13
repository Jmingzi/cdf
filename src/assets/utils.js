export default {
  formatTime(time, type) {
    if (!time) {
      return time
    }
    const dateTime = new Date(Number(time))
    let res = `${dateTime.getFullYear()}/${_zero(dateTime.getMonth()+1)}/${_zero(dateTime.getDate())}`
    return type === 1 ? `${res} ${_zero(dateTime.getHours())}:${_zero(dateTime.getMinutes())}` : `${res}`

    function _zero(num) {
      return num > 9 ? num : `0${num}`
    }
  },

  dev: process.env !== 'production'
}
