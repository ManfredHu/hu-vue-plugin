/**
 * change the fontSize property in html tag
 * 判断用户client width
 * 然后给html设置一个font-size
 * 目的是为了方便rem做自适应布局
 * @param {document} doc document object in broswer
 * @param {*} win window global object in broswer
 */
function rem (structWidth = 375) {
  const win = window
  const doc = document
  if (!win || !doc) {
    throw new Error('not window or document global object')
  }
  const docEl = doc.documentElement
  // 判断是横竖屏
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  function recalc () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // 按照比例缩放
    var docElWidth = 100 * (clientWidth / structWidth)
    // 控制 rem 最大值
    if (docElWidth > 200) docElWidth = 200
    docEl.style.fontSize = docElWidth + 'px'
    console.log('<html> font-size', docEl.style.fontSize)
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

export default rem
