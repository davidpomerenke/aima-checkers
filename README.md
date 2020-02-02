# aima-checkers

[![NPM version](https://img.shields.io/npm/v/aima-checkers.svg)](https://www.npmjs.com/package/aima-checkers)
![GitHub Actions status](https://github.com/davidpomerenke/aima-checkers/workflows/Node%20CI/badge.svg)

This is a formulation of the checkers game in the formal paradigm presented in [*Artificial Intelligence - A Modern Approach*](http://aima.cs.berkeley.edu/) (*AIMA*) by Stuart Russell and Peter Norvig. This module can be used in combination with the search algorithms from [aima-coffee](https://github.com/davidpomerenke/aima-coffee), specifically the `minimaxDecision` and the `alphaBetaSearch` algorithms. 

## Rules

There are several versions of checkers out there and I have not attempted to systematize them. 

These are the rules of this implementation:

You win the game if your opponent cannot do any moves and you have more pieces than them. In each round, you can move one of your checkers forward to a neighbouring empty black square. If this square is occupied by your opponent but the next square in this direction is free, then you can jump to the free square whilst your opponent will lose their checker. After a jump, you can perform another jump in the same round. If you reach the last row with a checker, it will be crowned and from the next round you can also move and jump backwards with it. When a checker jumps over a crowned checker, it will take over the crown. The same rules apply to both players. The player with the brown checkers starts.

## Graphical implementation

- [aima-checkers-gui](https://github.com/davidpomerenke/checkers)
