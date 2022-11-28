import { isClient } from '../utils'
import type { ComputedRef, Ref } from 'vue'

export type MaybeArray<T> = T | T[]
export type Fn = () => void
export type MaybeRef<T> = T | Ref<T>
export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>
export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined
