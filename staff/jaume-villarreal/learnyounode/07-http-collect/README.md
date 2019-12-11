# About bl module
## CASE #1 => index.js
This file uses `bl` module (_buffer list_).
1. This module is a buffer list collector and it doesn't need keyword 'new' when constructor is invoqued.
2. Response sends data onto it using `pipe` method, so `bl` instance works as a chunk accumulator, keeping in buffer all pieces of data until all are received.

## CASE #2 => index-1.js
This file doesn't use **bl module**. Instead of this, it implements an accumulator to emulate the operation of a **bl module**.
1. The response flow is ordered its own events: `error`, `data` and `end`.
2. `data` event gets pieces of data (called **`chunks`**) and accumulates them in `content` variable
3. `end` event invoques `console.log()` and prints `content`.

