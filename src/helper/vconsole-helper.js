export default () => {
  /**
   * local file method, using dynamic imports, see https://webpack.docschina.org/guides/code-splitting
   */

  const lowerLocation = window.location.href.toLowerCase()
  if (!/debug=vconsole/.test(lowerLocation) && !/vconsole=true/.test(lowerLocation)) return
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then((VConsole) => {
    if (typeof VConsole !== 'function') VConsole = VConsole.default
    const vc = new VConsole()
    // eslint 不输出会告警，我也是醉了这个new VConsole,并没有用到这个变量
    console.log('vconsole inited', vc)
  })
}
