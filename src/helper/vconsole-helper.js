export default () => {
  /**
   * local file method, using dynamic imports, see https://webpack.docschina.org/guides/code-splitting
   */

  const lowerLocation = window.location.href.toLowerCase()
  if (!/debug=vconsole/.test(lowerLocation) && !/vconsole=true/.test(lowerLocation)) return
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then((VConsole) => {
    if (typeof VConsole !== 'function') VConsole = VConsole.default
    if (window) {
      window.vConsole = new VConsole()
    } else {
      const vc = new VConsole()
      console.log('VConsole', vc)
    }
  })
}
