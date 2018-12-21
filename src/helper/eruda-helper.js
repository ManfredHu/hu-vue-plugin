
export default () => {
  /**
   * Cdn method, but affected by cross-domain
   */
  // function erudaInit () {
  //   if (!/debug=eruda/.test(window.location) && !/eruda=true/.test(window.location)) return
  //   // using jsdelivr
  //   const src = '//cdn.jsdelivr.net/npm/eruda'
  //   const scriptSrc = document.createElement('script')
  //   scriptSrc.src = src
  //   scriptSrc.onload = () => {
  //     const scriptInit = document.createElement('script')
  //     scriptInit.appendChild(document.createTextNode('eruda.init()'))
  //     document.body.appendChild(scriptInit)
  //   }
  //   document.body.appendChild(scriptSrc)
  // }
  // document.addEventListener('DOMContentLoaded', erudaInit, false)

  if (!/debug=eruda/.test(window.location) && !/eruda=true/.test(window.location)) return
  import(/* webpackChunkName: "eruda" */ 'eruda').then((eruda) => {
    if (eruda.default) eruda = eruda.default
    // Must be added to the body or cannot be query with document.querySelector
    const el = document.createElement('div')
    el.id = 'huVuePluginEruda'
    document.body.appendChild(el)
    eruda.init({
      container: el
    })
  })
}
