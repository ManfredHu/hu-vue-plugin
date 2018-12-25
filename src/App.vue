<template>
  <div id="app">
    <Demo/>
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
import Demo from './components/Demo'
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    Demo
    // ,
    // HelloWorld
  },
  created () {
    // const link = location.href
    // const jumpLink = link.indexOf('?') > -1 ? '' : (link + '?eruda=true&vconsole=true')
    // if (jumpLink) location.href = jumpLink
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
