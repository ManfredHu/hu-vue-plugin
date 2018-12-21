/**
 * v-tap指令用法：
 * 给template元素绑定v-tap="methodName",在PC绑定click事件，在移动端绑定touch事件（防止移动端点击穿透）
 * 点透具体可以看这里：https://segmentfault.com/a/1190000003848737
 * 1.可以加修饰符.stop调用e.stopPropagation()和.prevent调用e.preventDefault()
 * 2.可以加.move则可以在回调event.moveTag收到是'left'/'rigth'/'up'/'down'/false，注意这里移动必须大于moveStandard(默认70)
 * 3.v-tap可以加在带有href跳转链接的a标签上，会自动做页面跳转如 <a v-tap href="https://www.qq.com"></a>
*/

import { TypeCheck, UA } from 'hu-tool'

// the distance between touchstart and touchend
const distanceStandard = 10
// the time between touchstart and touchend
const timeStandard = 200
// More than 70 is considered moving
const moveStandard = 70
// May be x1/y1 or y1/x1 depending on whether x1 is greater than y1
const xyMultiple = 11

/**
 * check is Tap event
 * The distance between the touchstart of the touch and the touchend of the touch should be within distanceStandard
 * @param {element} self
 */
function isTap (self) {
  // if click the disabled input ,cancal!
  if (self.disabled) {
    return false
  }
  const tapObj = self.tapObj
  // 这里的逻辑是为了区分滑动操作
  const tapX = !TypeCheck.isNumber(tapObj.distanceX) || (Math.abs(tapObj.distanceX) < distanceStandard && (tapObj.clientX || tapObj.pageX))
  const tapY = !TypeCheck.isNumber(tapObj.distanceY) || (Math.abs(tapObj.distanceY) < distanceStandard && (tapObj.clientY || tapObj.pageY))
  const result = tapObj.timeGap < timeStandard && tapX && tapY
  return result
}

function isMove (self) {
  // if click the disabled input ,cancal!
  if (self.disabled) {
    return false
  }
  const tapObj = self.tapObj

  if (!TypeCheck.isNumber(tapObj.distanceX) || !TypeCheck.isNumber(tapObj.distanceY)) {
    return false
  }
  const x1 = Math.abs(tapObj.distanceX)
  const y1 = Math.abs(tapObj.distanceY)
  const z = x1 > y1 ? x1 / y1 : y1 / x1

  // x > y 代表左右滑动， 反之则为上下滑动
  if (x1 > y1) {
    if (z > xyMultiple) {
      return tapObj.distanceX < -moveStandard ? 'right' : tapObj.distanceX > moveStandard ? 'left' : false
    } else {
      return false
    }
  } else {
    if (z > xyMultiple) {
      return tapObj.distanceY < -moveStandard ? 'down' : tapObj.distanceY > moveStandard ? 'up' : false
    } else {
      return false
    }
  }
}

/**
 * 获取鼠标在页面的位置信息存储到el.tapObj
 * 获取点击时刻的时间戳存储到el.time
 * @param {event} e
 * @param {element} self
 */
function touchstart (e, self) {
  const touches = e.touches[0]
  const { tapObj } = self
  tapObj.pageX = touches.pageX
  tapObj.pageY = touches.pageY
  tapObj.clientX = touches.clientX
  tapObj.clientY = touches.clientY
  tapObj.touchStartTime = new Date()
}

function touchend (e, self, modifiers) {
  // 默认单点触摸 https://segmentfault.com/q/1010000002870710
  // http://www.cnblogs.com/yexiaochai/p/3462657.html
  // touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息
  const touches = e.changedTouches[0]
  const { tapObj } = self
  tapObj.timeGap = new Date() - tapObj.touchStartTime
  tapObj.distanceX = tapObj.pageX - touches.pageX
  tapObj.distanceY = tapObj.pageY - touches.pageY

  // 如果有.move修饰符
  const moveModify = modifiers && (modifiers.move)
  if (moveModify) {
    const moveTag = isMove(self)
    if (moveTag) {
      // emit el.tapObj.handler
      tapObj.handler(e, false, moveTag)
    }
  } else {
    // 判断是否是tag，是则触发绑定事件，否则不处理
    if (isTap(self)) {
      tapObj.handler(e, false)
    }
  }
}

function _callback (el, binding) {
  el.tapObj = {}
  el.tapObj.handler = (e, isPc = false, moveTag = false) => { // This directive.handler
    let callback = binding.value
    if (!callback && el.href && !binding.modifiers.prevent) {
      window.location = el.href
      return
    }
    callback.event = e
    if (!isPc) {
      callback.tapObj = el.tapObj
    }

    const tagName = callback.event.target.tagName.toLocaleLowerCase()
    if (tagName === 'input') {
      // not only focus, but also execute callback
      callback.event.target.focus()
    }

    e['moveTag'] = moveTag
    // add moveTag/event/tapObj properties to the arguments
    callback(e)
  }
}
const _tap = {
  bind: (el, binding) => {
    _callback.call(this, el, binding)
    if (UA().isPC) {
      el.addEventListener('click', e => {
        if (binding.modifiers.stop) e.stopPropagation()
        if (binding.modifiers.prevent) e.preventDefault()
        el.tapObj.handler(e, true)
      }, false)
    } else {
      el.addEventListener('touchstart', e => {
        // for .stop/.prevent 修饰符
        // https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6
        if (binding.modifiers.stop) e.stopPropagation()
        if (binding.modifiers.prevent) e.preventDefault()
        touchstart(e, el)
      }, false)
      el.addEventListener('touchend', e => {
        try {
          Object.defineProperty(e, 'currentTarget', { // 重写currentTarget对象 与jq相同
            value: el,
            writable: true,
            enumerable: true,
            configurable: true
          })
        } catch (e) {
          // ios 7下对 e.currentTarget 用defineProperty会报错。
          // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
          // 在catch里重写
          e.currentTarget = el
        }

        // 这会调用event.preventDefault()以防止浏览器继续处理触摸事件（这也可以防止鼠标事件也被传递）
        e.preventDefault()

        return touchend(e, el, binding.modifiers)
      }, false)
    }
  },
  componentUpdated: _callback,
  unbind: el => {
    el.tapObj.handler = null
    el.tapObj = null
  }
}

// const mixin = {
//   directives: {
//     tap: _tap // 参照 https://cn.vuejs.org/v2/guide/custom-directive.html
//   }
// }

export default _tap
