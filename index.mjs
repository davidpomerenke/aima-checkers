import { Game } from 'aima'

export const checkers = new Game({
  initialState: {
    p: [
      [0, 0, false], [0, 2, false], [0, 4, false], [0, 6, false],
      [1, 1, false], [1, 3, false], [1, 5, false], [1, 7, false],
      [2, 0, false], [2, 2, false], [2, 4, false], [2, 6, false]
    ],
    q: [
      [5, 1, false], [5, 3, false], [5, 5, false], [5, 7, false],
      [6, 0, false], [6, 2, false], [6, 4, false], [6, 6, false],
      [7, 1, false], [7, 3, false], [7, 5, false], [7, 7, false]
    ],
    player: 'p',
    opponent: 'q'
  },
  player: state => state.player,
  actions: state => forceJump(state[state.player].flatMap(pos => [
    ...movePaths(state, pos),
    ...jumpPaths(state, pos)
  ])),
  result: (state, action) => recursiveResult(state, action, true),
  terminalTest: state =>
    state.p.length === 0 ||
    state.q.length === 0 ||
    checkers.actions(state).length === 0,
  utility: state => state.p.length - state.q.length,
  heuristic: state => state.p.length - state.q.length
})

export const forceJump = actions => actions.filter((action, _, actions) =>
  !actions.some(action => dist(action[0], action[1]) / 2 === 2) ||
  dist(action[0], action[1]) / 2 === 2
)

export const movePaths = (state, [y, x, royal]) =>
  directions(royal)
    .map(direction => [[y, x, royal], endPointYXR(state, [y, x, royal], direction)])
    .filter(([start, end]) => onBoard(end) && !occupied(state, end))

export const jumpPaths = (state, start) =>
  jump(state, start)
    .flatMap(([start, end]) => [
      [start, end],
      ...jumpPaths(/* state = */ stepResult(state, start, end, false), /* start = */ end)
        .map(jumpPath => [start, ...jumpPath])
    ]
    )

export const jump = (state, [y, x, royal]) =>
  directions(royal)
    .map(direction => [[y, x, royal], endPointYX(state, [y, x, royal], direction, 2)])
    .filter(([start, end]) =>
      onBoard(end) &&
      !occupied(state, end) &&
      occupiedBy(state, intermediate(start, end), state.opponent))
    .map(([start, end]) => [start, [...end, crowned(state, start, end)]])

export const endPointYX = (state, [y, x, royal], [forward, sideward], steps = 1) => [
  y + forward * playerDirection(state) * steps,
  x + sideward * steps
]

export const crowned = (state, [y1, x1, royal], [y2, x2]) =>
  royal ||
  y2 === 3.5 + 3.5 * playerDirection(state) ||
  (dist([y1, x1], [y2, x2]) / 2 === 2 &&
    state[state.opponent].find(pos => eq(pos, intermediate([y1, x1], [y2, x2])))[2])

export const endPointYXR = (state, start, direction, steps = 1) => [
  ...endPointYX(state, start, direction, steps),
  crowned(state, start, endPointYX(state, start, direction, steps))
]

export const onBoard = ([y, x]) => y >= 0 && y <= 7 && x >= 0 && x <= 7

export const occupied = (state, pos) =>
  ['p', 'q'].some(p => occupiedBy(state, pos, p))

export const occupiedBy = (state, posA, player) =>
  state[player].some(posB => eq(posA, posB))

export const playerDirection = state => state.player === 'p' ? +1 : -1

export const eq = ([y1, x1], [y2, x2]) => y1 === y2 && x1 === x2

export const directions = royal => [[+1, -1], [+1, +1], ...royal ? [[-1, -1], [-1, +1]] : []]

export const recursiveResult = (state, action, nextPlayer = false) =>
  action.length >= 2
    ? stepResult(
      recursiveResult(state, action.slice(0, action.length - 1)),
      action[action.length - 2],
      action[action.length - 1],
      nextPlayer
    )
    : state

export const stepResult = (state, startPoint, endPoint, nextPlayer) => ({
  [state.player]: [
    ...state[state.player].filter(pos => !eq(pos, startPoint)),
    endPoint
  ],
  [state.opponent]: state[state.opponent].filter(pos =>
    !casualty(pos, [startPoint, endPoint])),
  player: nextPlayer ? state.opponent : state.player,
  opponent: nextPlayer ? state.player : state.opponent
})

export const casualty = (pos, [startPoint, endPoint]) =>
  dist(startPoint, endPoint) / 2 === 2 &&
  eq(pos, intermediate(startPoint, endPoint))

export const dist = ([y1, x1], [y2, x2]) => Math.abs(y2 - y1) + Math.abs(x2 - x1)

export const intermediate = ([y1, x1], [y2, x2]) => [(y1 + y2) / 2, (x1 + x2) / 2]

export const boardString = state => board(state).map(row => row.join('')).reverse().join('\n')

export const board = state =>
  [0, 1, 2, 3, 4, 5, 6, 7].map(y =>
    [0, 1, 2, 3, 4, 5, 6, 7].map(x =>
      state.p.some(pos => eq(pos, [y, x]))
        ? state.p.find(pos => eq(pos, [y, x]))[2]
          ? 'X'
          : 'x'
        : state.q.some(pos => eq(pos, [y, x]))
          ? state.q.find(pos => eq(pos, [y, x]))[2]
            ? 'O'
            : 'o'
          : ' '
    )
  )
