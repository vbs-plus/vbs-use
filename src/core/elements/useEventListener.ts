import { watch } from 'vue-demi'
import { defaultWindow } from '../../types'
import { isString, tryOnScopeDispose } from '../../utils'
import type { Fn, MaybeArray, MaybeComputedRef } from '../../types'

export interface CustomEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any
  removeEventListener(event: Events, fn?: any, options?: any): any
}

/** export keyof WindowEventMap & DocumentEventMap */
export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap
export interface CustomEventListener<T> {
  (evt: T): void
}

/**
 * Overload 1: Not pass Window target
 *
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends WindowEventName>(
  event: MaybeArray<E>,
  listener: MaybeArray<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Overload 2: Explicitly Window target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends WindowEventName>(
  target: Window,
  event: MaybeArray<E>,
  listener: MaybeArray<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Overload 3: Explicitly Document target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends DocumentEventName>(
  target: Document,
  event: MaybeArray<E>,
  listener: MaybeArray<(this: Document, ev: DocumentEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Overload 4: Custom Event target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends string, T = Event>(
  target: CustomEventTarget<E>,
  event: MaybeArray<E>,
  listener: MaybeArray<CustomEventListener<T>>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Overload 5: MaybeComputedRef custom event target fallback
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E = Event>(
  target: MaybeComputedRef<EventTarget | null | undefined>,
  event: MaybeArray<string>,
  listener: MaybeArray<CustomEventListener<E>>,
  options?: boolean | AddEventListenerOptions
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeComputedRef<EventTarget> | undefined
  let events: MaybeArray<string>
  let listeners: MaybeArray<Function>
  let options: boolean | AddEventListenerOptions | undefined

  // init params
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args
    target = defaultWindow
  } else {
    [target, events, listeners, options] = args
  }

  if (!target) return () => { }
  // As an array
  if (!Array.isArray(events))
    events = [events]
  if (!Array.isArray(listeners))
    listeners = [listeners]

  const removeListeners: Function[] = []
  // call all the listener then empty the listeners
  const removeListener = () => {
    removeListeners.forEach(fn => fn())
    removeListeners.length = 0
  }

  const register = (el: any, event: string, listener: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  // Vue instance updates listening target and registers events
  const stopWatcher = watch(
    () => target,
    (el) => {
      if (!el) return
      removeListeners.push(
        ...(events as string[]).flatMap((e) => {
          return (listeners as Function[]).map(listener => register(el, e, listener))
        }),
      )
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    stopWatcher()
    removeListener()
  }

  tryOnScopeDispose(stop)

  return stop
}
