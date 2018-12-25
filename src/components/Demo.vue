<template>
  <div class="manfredhu">
    <img class="manfredhu-banner" src="../assets/manfredhu.jpeg" />
    <h1 class="manfredhu-title">ManfredHu胡文峰</h1>
    <p class="manfredhu-desc">{{nowTime}}</p>
    <a class="manfredhu-btn" href="https://www.manfredhu.com">Homepage</a>
    <Btn v-bind="btn"></Btn>
    <p class="manfredhu-desc">{{cookieText}}</p>
    <Btn v-bind="btnLocal"></Btn>
    <p class="manfredhu-desc">{{localText}}</p>
    <Btn v-bind="btnAxios"></Btn>
    <p class="manfredhu-desc">{{axiosText}}</p>
  </div>
</template>

<script>
import btn from './btn'
export default {
  name: 'Demo',
  components: {
    Btn: btn
  },
  data () {
    return {
      btn: {
        btnText: 'set cookie now date',
        type: 'fail',
        callback: (e) => {
          console.log('events', e)
          this.$cookie.set('date', this.$time().format('YYYY-MM-DD'), { expires: 7, path: '' })
          this.cookieText = this.$cookie.get('date')
        }
      },
      nowTime: this.$time().format('YYYY-MM-DD HH:mm:ss'),
      cookieText: '',
      localText: '',
      btnLocal: {
        btnText: 'set localStorage now time',
        type: 'suc',
        callback: (e) => {
          console.log('events', e)
          this.$cache.setItem('time', this.$time().format('HH:mm:ss')).then(() => {
            this.$cache.getItem('time').then((data) => {
              this.localText = data
            })
          })
        }
      },
      btnAxios: {
        btnText: 'get data by axios',
        type: 'fail',
        callback: (e) => {
          console.log('events', e)
          this.$axios.get('/static/test.json').then(({data}) => {
            this.axiosText = data
          })
        }
      },
      axiosText: ''
    }
  },
  created () {
    this.$et.on('btnCreated', (e) => {
      console.log('btnCreated event emitting target is ', e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 2px;
.manfredhu{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 181/@rem 0;
  min-height: 1153/@rem;
  &-banner{
    width: 240/@rem;
  }
  &-title{
    font-size: 34/@rem;
    margin-top: 63/@rem;
  }
  &-desc{
    text-align:center;
    font-size: 26/@rem;
    color: #888;
    margin-top: 23/@rem;
    line-height: 1.5;
    padding: 0 20/@rem;
  }
  &-btn{
    color: #1AAD19;
    font-size: 32/@rem;
    padding: 10/@rem 130/@rem;
    border: 2/@rem solid #1AAD19;
    border-radius: 8/@rem;
    background: #fff;
    margin-top: auto;
    text-decoration: none;
  }
}
</style>
