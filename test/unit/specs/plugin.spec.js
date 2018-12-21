import { shallowMount, mount } from '@vue/test-utils'
import TapTest from '../../components/TapTest.vue'
import Vue from 'vue'
import huVuePlugin from '@/index'

test('mount tools test', () => {
  Vue.use(huVuePlugin)
  const msg = 'new message'
  const wrapper = shallowMount(TapTest, {
    propsData: { msg }
  })
  expect(wrapper.vm.$et).toBeTruthy()
  expect(wrapper.vm.$cookie).toBeTruthy()
  expect(wrapper.vm.$time).toBeTruthy()
  expect(wrapper.vm.$axios).toBeTruthy()
  expect(wrapper.vm.$cache).toBeTruthy()
})

test('hu-tools test', () => {
  Vue.use(huVuePlugin)
  const msg = 'new message'
  const wrapper = shallowMount(TapTest, {
    propsData: { msg }
  })

  const mouteTool = [
    'TypeCheck',
    'Phone',
    'UA',
    'URL'
  ]
  mouteTool.forEach(item => {
    expect(wrapper.vm.$tool[item]).toBeTruthy()
  })
})

test('v-tap test', () => {
  Vue.use(huVuePlugin)
  const wrapper = mount(TapTest)
  wrapper.find('p.test1').trigger('click')
  expect(wrapper.find('h1.manfredhu-title').text()).toBe('change title!! And emit component update')
})
