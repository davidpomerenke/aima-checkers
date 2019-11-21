import { checkers, board, boardString } from './index.mjs'
// import * as i from './index.mjs'
import { strict as assert } from 'assert'

let state

// example

state = checkers.initialState

state = checkers.result(state, [[2, 2, false], [3, 1, false]])
assert.deepEqual(board(state), [
  [' ', 'o', ' ', 'o', ' ', 'o', ' ', 'o'],
  ['o', ' ', 'o', ' ', 'o', ' ', 'o', ' '],
  [' ', 'o', ' ', 'o', ' ', 'o', ' ', 'o'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'x', ' ', ' ', ' ', ' ', ' ', ' '],
  ['x', ' ', ' ', ' ', 'x', ' ', 'x', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
  ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' ']
].reverse())

state = checkers.result(state, [[5, 3, false], [4, 2, false]])
assert.deepEqual(board(state), [
  [' ', 'o', ' ', 'o', ' ', 'o', ' ', 'o'],
  ['o', ' ', 'o', ' ', 'o', ' ', 'o', ' '],
  [' ', 'o', ' ', ' ', ' ', 'o', ' ', 'o'],
  [' ', ' ', 'o', ' ', ' ', ' ', ' ', ' '],
  [' ', 'x', ' ', ' ', ' ', ' ', ' ', ' '],
  ['x', ' ', ' ', ' ', 'x', ' ', 'x', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
  ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' ']
].reverse())

state = checkers.result(state, [[3, 1, false], [5, 3, false]])
assert.deepEqual(board(state), [
  [' ', 'o', ' ', 'o', ' ', 'o', ' ', 'o'],
  ['o', ' ', 'o', ' ', 'o', ' ', 'o', ' '],
  [' ', 'o', ' ', 'x', ' ', 'o', ' ', 'o'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['x', ' ', ' ', ' ', 'x', ' ', 'x', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
  ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' ']
].reverse())
assert(!checkers.terminalTest(state))

// testing

// arrayfication & stringification
state = {
  p: [
    [0, 0, false],
    [0, 2, true]
  ],
  q: [
    [0, 4, false],
    [0, 6, true]
  ],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(board(state), board(state), [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['x', ' ', 'X', ' ', 'o', ' ', 'O', ' ']
].reverse())
assert.equal(boardString(state),
  '        \n' +
  '        \n' +
  '        \n' +
  '        \n' +
  '        \n' +
  '        \n' +
  '        \n' +
  'x X o O '
)

// normal checkers move
state = {
  p: [[1, 1, false]],
  q: [],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(checkers.actions(state), [
  [[1, 1, false], [2, 0, false]],
  [[1, 1, false], [2, 2, false]]
])
assert.deepEqual(checkers.result(state, [[1, 1, false], [2, 0, false]]), {
  p: [[2, 0, false]],
  q: [],
  player: 'q',
  opponent: 'p'
})
assert.deepEqual(checkers.result(state, [[1, 1, false], [0, 0, false]]), undefined)

// royal checkers move
state = {
  p: [[1, 1, true]],
  q: [],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(checkers.actions(state), [
  [[1, 1, true], [2, 0, true]],
  [[1, 1, true], [2, 2, true]],
  [[1, 1, true], [0, 0, true]],
  [[1, 1, true], [0, 2, true]]
])
assert.deepEqual(checkers.result(state, [[1, 1, true], [0, 0, true]]), {
  p: [[0, 0, true]],
  q: [],
  player: 'q',
  opponent: 'p'
})

// crowning
state = {
  p: [],
  q: [
    [1, 1, false],
    [2, 4, false]
  ],
  player: 'q',
  opponent: 'p'
}
assert.deepEqual(checkers.actions(state), [
  [[1, 1, false], [0, 0, true]],
  [[1, 1, false], [0, 2, true]],
  [[2, 4, false], [1, 3, false]],
  [[2, 4, false], [1, 5, false]]
])

// (forced) jumping
state = {
  p: [[0, 2, false]],
  q: [[1, 3, false]],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(checkers.actions(state), [
  [[0, 2, false], [2, 4, false]]
])
assert.deepEqual(checkers.result(state, [[0, 2, false], [2, 4, false]]), {
  p: [[2, 4, false]],
  q: [],
  player: 'q',
  opponent: 'p'
})

// regicide
state = {
  p: [[0, 2, false]],
  q: [[1, 3, true]],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(checkers.actions(state), [
  [[0, 2, false], [2, 4, true]]
])
assert.deepEqual(checkers.result(state, [[0, 2, false], [2, 4, true]]), {
  p: [[2, 4, true]],
  q: [],
  player: 'q',
  opponent: 'p'
})

// multiple jumping
state = {
  p: [[0, 2, false]],
  q: [
    [1, 3, false],
    [3, 5, false],
    [5, 3, false],
    [5, 5, false]
  ],
  player: 'p',
  opponent: 'q'
}
assert.deepEqual(checkers.actions(state), [
  [[0, 2, false], [2, 4, false]],
  [[0, 2, false], [2, 4, false], [4, 6, false]],
  [[0, 2, false], [2, 4, false], [4, 6, false], [6, 4, false]]
])
assert.deepEqual(checkers.result(state, [[0, 2, false], [2, 4, false], [4, 6, false]]), {
  p: [[4, 6, false]],
  q: [
    [5, 3, false],
    [5, 5, false]
  ],
  player: 'q',
  opponent: 'p'
})

// multiple jumping with regicide
state = {
  p: [[0, 0, false]],
  q: [
    [1, 1, false],
    [3, 3, true],
    [3, 5, false],
    [5, 5, false]
  ],
  player: 'p',
  opponent: 'q'
}
/* assert.deepEqual(checkers.actions(state), [
  [[0, 0, false], [2, 2, false]],
  [[0, 0, false], [2, 2, false], [4, 4, true]],
  [[0, 0, false], [2, 2, false], [4, 4, true], [6, 6, true]],
  [[0, 0, false], [2, 2, false], [4, 4, true], [2, 6, true]]
]) */
