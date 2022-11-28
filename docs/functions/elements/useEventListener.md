# useEventListener

Use EventListener like a pro. Register using [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on mounted, and [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) automatically on unmounted.

## Usage

```ts
import { useEventListener } from 'vbs-use'

useEventListener(document, 'click', (evt) => { console.log(evt) })
```

Use a ref as the event target, `useEventListener` will unregister the previous event and register the new one when you change the target.

```ts
import { useEventListener } from 'vbs-use'

const element = ref<HTMLDivElement>()
useEventListener(element, 'click', (e) => { console.log(e.key) })
```

```vue
<template>
  <div v-if="con" ref="element">
    Div1
  </div>
  <div v-else ref="element">
    Div2
  </div>
</template>
```

You can also manually destroy the listener. 

```ts
import { useEventListener } from 'vbs-use'

const cleanup = useEventListener(document, 'click', (e) => { console.log(e.key) })

cleanup() // This will unregister the listener.
```

## Type Declarations

```ts
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
```
