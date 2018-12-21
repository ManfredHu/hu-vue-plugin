<template>
  <div class="manfredhu">
    <h1 class="manfredhu-title">{{title}}</h1>
    <p class="manfredhu-desc test1" v-tap="testTap">这个是测试tap指令的</p>
    <p class="manfredhu-desc" v-tap.move="testTap">这个有修饰符move的tap指令</p>
    <a class="manfredhu-desc" v-tap href="https://www.qq.com">这个没有修饰符move的a标签</a>
    <div class="verification">
      <div class="verification-text">验证码</div>
      <input class="verification-input" type="number" v-tap="inputVerifiNum" placeholder="请输入验证码" />
      <input class="verification-btn" type="button" v-tap="inputVerifiNum" value="获取验证码" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TapTest',
  props: {
    msg: String
  },
  data () {
    return {
      title: 'This is the page for testing the tap command.',
      verifiNum: ''
    }
  },
  methods: {
    testTap (e) {
      // console.log('methods testTap arguments event:', e)
      if (e.moveTag) {
        let dir = ''
        switch (e.moveTag) {
          case 'left': dir = 'left'; break
          case 'right': dir = 'right'; break
          case 'up': dir = 'up'; break
          case 'down': dir = 'down'; break
          default: dir = ''
        }
        this.title = 'move to the ' + dir
      } else {
        this.title = 'change title!! And emit component update'
      }
    },
    inputVerifiNum (e) {
      // console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
}
.verification{
  border-top: 2/@rem solid #CFD6DA;
  border-bottom: 2/@rem solid #CFD6DA;
  display: flex;
  align-items: center;
  height: 80/@rem;
  width: 100%;
  &-text{
    display: block;
    height: 80/@rem;
    line-height: 80/@rem;
    font-size: 14/@rem;
    text-align: center;
    width: 120/@rem;
  }
  &-input{
    font-size: 14/@rem;
    display: flex;
    flex: 1;
    padding-left: 20/@rem;
    height: 70/@rem;
    line-height: 70/@rem;
  }
  &-btn{
    font-size: 14/@rem;
    color: #1AAD19;
    width: 190/@rem;
    position: relative;
    height: 80/@rem;
    line-height: 80/@rem;
    &:before{
      content: "";
      width: 2/@rem;
      color: #CFD6DA;
      height: 62/@rem;
      position: absolute;
      border-left: 1px solid #CFD6DA;
      top: 9/@rem;
      left: 0;
    }
  }
}
</style>
