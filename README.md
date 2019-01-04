<h1><a href='https://github.com/ManfredHu/hu-vue-plugin'><img src='https://www.manfredhu.com/images/hu-vue-plugin.png' height='60' alt='hu-vue-plugin Logo' /></a></h1>

[![](https://img.shields.io/travis/ManfredHu/hu-vue-plugin.svg?style=flat-square)](https://travis-ci.org/ManfredHu/hu-vue-plugin.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](https://github.com/ManfredHu/hu-vue-plugin)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/ManfredHu/hu-vue-plugin)

这是一个比较简单上手的插件，集成一些现有的解决方案，如果有更好的模块或者解决方案，请提issue讨论

# 内置工具模块
## this.$et
使用 events 模块, click [here](https://github.com/Gozala/events).
```js
// listen
this.$et.on('createBtn', (obj, number) => {
})
// emit
this.$et.emit('createBtn', {a: 123}, 9527))
```

## this.$cookie
Using js-cookie, click [here](https://www.npmjs.com/package/js-cookie)
```js
// set
this.$cookie.set('time', new Date(), { expires: 7, path: '' })
// get
this.$cookie.get('time')
```

## this.$time
因为moment太大了在移动端，大约200K，所以用了轻量的同类语法的解决方案[dayjs](https://github.com/iamkun/dayjs).

```js
this.$time().format('YYYY-MM-DD HH:mm:ss') //2018-12-21 10:06:42
```

## this.$axios
Using Axios, click [here](https://github.com/axios/axios)

```js
this.$axios.get('/static/mock/axiosTestData.json').then(({data}) => {
  console.log(data)
})
```

## this.$cache
Using localforage, click [here](https://github.com/localForage/localForage).
这里其实localforage是支持localStorage/indexeddb/websql的，这里用到了localStorage.

```js
const self = this
this.$cache.setItem('time', 123).then(() => {
  self.$cache.getItem('time').then((data) => {
    // data: 123
  })
})
```

可以考虑传入option修改引擎。

But the default use of Web SQL in PC, if you need localStorage, [modify the driver](https://localforage.github.io/localForage/#settings-api-config).



# 移动端测试
## mobile debug
动态引用，不用到调试脚本的用户不拉取调试脚本。

### [eruda](https://github.com/liriliri/eruda)
增加 `&debug=eruda` 或者 `eruda=true` 的url参数.
代码在 `src/helper/eruda-helper.js`

### [vconsole](https://github.com/Tencent/vConsole)
增加 `&debug=vconsole` 或者 `vconsole=true`的url参数.
代码在 `src/helper/vconsole-helper.js`

## tools工具
### hu-tool
hu-tool包含常用的一些工具，比如URL模块，可以获取url的query、hash的参数之类的。比如TypeCheck可以做一些常用的类型检测。
具体的可以看[这里](https://github.com/ManfredHu/hu-tool)

### v-tap
我们知道移动端的click事件是有延迟的，所以会用`touchend`事件来做兼容。具体可以看`src/page/tapTest.vue`这个页面，对应的路由hash是`/tap`
tap指令的代码在`directive/tap.js`。或者也可以用[fastClick](https://github.com/ftlabs/fastclick)。

#### v-tap指令用法
给template元素绑定v-tap="methodName",在PC绑定click事件，在移动端绑定touch事件（防止移动端点击穿透）
点透具体可以看这里：https://segmentfault.com/a/1190000003848737

- 1.可以加修饰符`.stop`调用`e.stopPropagation()`和`.prevent`调用`e.preventDefault()`
- 2.可以加`.move`则可以在回调`event.moveTag`收到是'left'/'rigth'/'up'/'down'/false，注意这里移动必须大于moveStandard(默认70)
- 3.v-tap可以加在带有href跳转链接的a标签上，会自动做页面跳转如 `<a v-tap href="https://www.qq.com"></a>`

## style样式(会独立一个包)
### 使用normalize.css实现样式重置
具体可以看`src/main.js`里面，引入了normalize.css

### rem
`src/helper/rem.js`里面对`document.style.fontSize`做了动态设置，可以动态改变`<html>`标签的fontSize.这样样式就可以与设计稿(750px)统一，假设设计稿量出来是`apx`这么大。那么对应的代码就是`a/@rem`

### less的@rem单位全局设定
可以看一下`build/utils.js`

```js
if (loader === 'less') {
  loaders.push({
    loader: 'style-resources-loader',
    options:{
      patterns: [
          path.resolve(__dirname, '../src/style/base.less'),
      ]
    }
  })
}
```

这里用到了[`style-resources-loader`](https://github.com/yenshih/style-resources-loader)这个模块。可以不需要在每个component组件都引用一遍`src/style/base.less`的文件。
