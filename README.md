<p align="center">
<h1 align="center">Vbs-Use(WIP)</h1>
<p align="center">VBS Vue Composition Utilities for Vue 2 and 3(WIP)</p>
</p>

## TODO LIST

Elements: 
1. useActiveElement: Reactive document.activeElement.
2. useDraggable: Make elements draggable.
3. useElementBounding: Reactive bounding box of an HTML element.
4. useElementVisibility: Tracks the visibility of an element within the viewport.
5. useMouseInElement: Reactive mouse position related to an element.
6. useWindowScroll: Reactive window scroll.

Browser
1. useBreakpoints: Reactive viewport breakpoints.
2. useBrowserLocation: Reactive browser location.
3. useClipboard： Reactive Clipboard API.
4. useEventListener：Use EventListener with ease. Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
5. useFullscreen: Reactive Fullscreen API. 
6. useImage： Reactive load an image in the browser, you can wait the result to display it or show a fallback.
7. useUrlSearchParams: Reactive URLSearchParams.

Behavior:
1. onClickOutside: Listen for clicks outside of an element. Useful for modal or dropdown.
2. useGeolocation: Reactive Geolocation API. 
3. useInfiniteScroll: Infinite scrolling of the element.
4. useMouse: Reactive mouse position.
5. useOnline: Reactive online state. A wrapper of useNetwork.
6. useFetch: Reactive Fetch API provides the ability to abort requests, intercept requests before they are fired, automatically refetch requests when the url changes, and create your own useFetchwith predefined options.
7. useNow: Reactive current Date instance.
8. useIntervalFn: Wrapper for setInterval with controls.
9. useRafFn: Call function on every requestAnimationFrame. With controls of pausing and resuming.
10. useTimestamp: Reactive current timestamp.

Utils:
1. useVModel: Shorthand for v-model binding, props + emit -> ref.
2. useDateFormat: Get the formatted date according to the string of tokens passed in, inspired by dayjs.
3. useTimeAgo: Reactive time ago.
4. useSorted: Reactive sort array.
5. useBase64: Reactive base64 transforming. Supports plain text, buffer, files, canvas, objects, maps, sets and images.
6. useCounter: Basic counter with utility functions.
7. useCycleList: Cycle through a list of items.
8. useDebounceFn: Debounce execution of a function.
9. useThrottleFn: Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
10. useToggle: A boolean switcher with utility functions.

