import { useEventListener } from 'vbs-use'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { SpyInstance } from 'vitest'
import type { Fn } from '../src/types'

describe('useEventListener', () => {
  let target: HTMLDivElement
  let removeSpy: SpyInstance
  let addSpy: SpyInstance
  let stop: Fn
  const options: AddEventListenerOptions = { capture: true }

  beforeEach(() => {
    target = document.createElement('div')
    // 创建事件监听对象
    removeSpy = vitest.spyOn(target, 'removeEventListener')
    addSpy = vitest.spyOn(target, 'addEventListener')
  })

  it('should be defined', () => {
    expect(useEventListener).toBeDefined()
  })

  describe('given single listener and single event', () => {
    const listener = vitest.fn()
    const event = 'click'

    beforeEach(() => {
      // 执行清空函数体操作
      listener.mockReset()
      // 注册监听
      stop = useEventListener(target, event, listener, options)
    })

    it('should add event listener', () => {
      expect(addSpy).toBeCalledTimes(1)
    })

    it('should trigger listener', () => {
      expect(listener).not.toBeCalled()
      // 触发事件
      target.dispatchEvent(new MouseEvent(event))
      expect(listener).toBeCalledTimes(1)
    })

    it('should remove event listener', () => {
      expect(removeSpy).not.toBeCalled()
      stop()
      expect(removeSpy).toBeCalledTimes(1)
      expect(removeSpy).toBeCalledWith(event, listener, options)
    })
  })
})
