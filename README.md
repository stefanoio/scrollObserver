# scrollObserver
## Make things happens while you scroll.

scrollObserver is a small (<1KB) framework for scroll based animations and interactions. There are other scroll based animation libraries, but scrollObserver is minimal, lightweight, and it is meant for developers looking for a quick way to produce highly customized interactions.
It works on any modern browser (IE10+) and has no dependency from any other libraries.

scrollObserver come as a global `scrollObserver` object with three methods:

`scrollObserver.observe(selector, callback)` which will start observing elements matched by `selector` and calling the `callback(position)` when a scroll happens while the element is inside the viewport. The `position` parameter is a number between 0 and 1 representing the vertical position of the element inside the viewport, from 0 on bottom side to 1 on top side.

`scrollObserver.forget(selector)` will stop observing elements matching `selector`.

`scrollObserver.refresh()` will recalculate page and elements dimensions (eg: to be used after DOM injections or asset loading).

Here are some examples: http://stefanoio.github.io/scrollObserver/examples/ (no fancy stuff, just some demo of what you can do with scrollObserver, in fact your imagination is the limit)

To build a minified version inside the dist folder you can use:
```
npm install && npm run build
```
