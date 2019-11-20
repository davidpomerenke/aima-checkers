import { checkers, board } from './index.mjs'
import { strict as assert } from 'assert'

let state
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
