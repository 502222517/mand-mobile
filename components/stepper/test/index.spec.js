import {Stepper} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import triggerTouch from '../../popup/test/touch-trigger'

describe('Stepper Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('stepper method reduce', done => {
    wrapper = mount(Stepper, {
      propsData: {
        value: 1,
        step: 2,
      },
    })
    wrapper.setProps({value: 2})
    wrapper.vm.$nextTick(() => {
      wrapper.find('.md-stepper-button-reduce').trigger('click')
      expect(Number(wrapper.vm.currentNum)).toBe(0)

      wrapper.setProps({disabled: true})
      wrapper.vm.$nextTick(() => {
        wrapper.find('.md-stepper-button-reduce').trigger('click')
        expect(Number(wrapper.vm.currentNum)).toBe(0)
        done()
      })
    })

    // wrapper.setProps({disabled: true})
    // wrapper.find('.md-stepper-button-reduce').trigger('click')
    // expect(Number(wrapper.vm.currentNum)).toBe(0)
  })

  test('stepper method add', () => {
    wrapper = mount(Stepper)
    wrapper.vm.currentNum = 1
    wrapper.vm.step = 2
    wrapper.find('.md-stepper-button-add').trigger('click')
    expect(wrapper.vm.currentNum).toBe(3)

    wrapper.setProps({disabled: true})
    wrapper.find('.md-stepper-button-add').trigger('click')
    expect(wrapper.vm.currentNum).toBe(3)
  })

  test('stepper method getCurrentNum', () => {
    wrapper = mount(Stepper)
    wrapper.vm.defaultValue = 2
    wrapper.vm.min = 3
    expect(wrapper.vm.$_getCurrentNum()).toBe(wrapper.vm.min)

    wrapper.vm.defaultValue = 4
    wrapper.vm.max = 3
    expect(wrapper.vm.$_getCurrentNum()).toBe(wrapper.vm.max)
  })

  test('stepper method checkMinMax', () => {
    wrapper = mount(Stepper)
    wrapper.vm.max = 5
    wrapper.vm.min = 3
    expect(wrapper.vm.$_checkMinMax()).toBe(true)

    wrapper.vm.max = 3
    wrapper.vm.min = 5
    expect(wrapper.vm.$_checkMinMax()).toBe(false)
  })

  test('stepper method checkStatus', () => {
    wrapper = mount(Stepper)
    wrapper.vm.min = 2
    wrapper.vm.currentNum = 3
    wrapper.vm.step = 2
    wrapper.vm.$_checkStatus()
    expect(wrapper.vm.isMin).toBe(true)
  })

  test('stepper input', () => {
    wrapper = mount(Stepper)
    const input = wrapper.find('input')
    triggerTouch(input.element, 'focus')
    triggerTouch(input.element, 'input', 0, 0, 5)
    expect(wrapper.vm.currentNum).toBe(5)
  })

  test('stepper method onChange', () => {
    wrapper = mount(Stepper)
    wrapper.vm.currentNum = 2
    wrapper.vm.min = 3
    wrapper.vm.$_onChange()
    // currentNum < min
    expect(wrapper.vm.currentNum).toBe(wrapper.vm.min)

    wrapper.vm.currentNum = 6
    wrapper.vm.max = 5
    wrapper.vm.$_onChange()
    // currentNum > max
    expect(wrapper.vm.currentNum).toBe(wrapper.vm.max)

    wrapper.vm.currentNum = 4
    wrapper.vm.$_onChange()
    // min < currentNum < max
    expect(wrapper.vm.currentNum).toBe(4)
  })
})
