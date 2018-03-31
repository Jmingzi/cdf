export default {
  formatTime(time) {
    if (!time) {
      return time
    }
    const dateTime = new Date(Number(time))
    return `${dateTime.getFullYear()}/${_zero(dateTime.getMonth()+1)}/${_zero(dateTime.getDate())}`
    // ${_zero(dateTime.getHours())}:${_zero(dateTime.getMinutes())}

    function _zero(num) {
      return num > 9 ? num : `0${num}`
    }
  },

  dev: process.env !== 'production'
}
