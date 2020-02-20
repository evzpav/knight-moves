const { generateChessBoard, validatePosition, findCoordinates, calculateMovesPerTurn, convertCoordinatesToPosition, resolveKnightMoves } = require("../services/chessService")();
const assert = require('chai').assert


describe('Chess Service tests', () => {

    describe('generateChessBoard', () => {
        it('compares chess board with generated', () => {
            const expectedBoard = [
                ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'],
                ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
                ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
                ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
                ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
                ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
                ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
                ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
            ]

            let board = generateChessBoard()
            for (let i = 0; i < board.length; i++) {
                const line = board[i];
                const lineExpected = expectedBoard[i];
                assert.equal(compareArrays(line, lineExpected), true)
            }
        })

    })

    describe('validatePosition', () => {
        it('valid position A8', () => {
            assert.equal(validatePosition("A8"), true);
        })

        it('valid position H1', () => {
            assert.equal(validatePosition("H1"), true);
        })

        it('invalid position A9', () => {
            assert.equal(validatePosition("A9"), false);
        })

        it('invalid position a1', () => {
            assert.equal(validatePosition("a1"), false);
        })

        it('invalid position Z1', () => {
            assert.equal(validatePosition("A9"), false);
        })

    })

    describe('findCoordinates', () => {
        it('find coordinate for position A8', () => {
            assert.equal(findCoordinates("A8"), "00");
        })

        it('find coordinate for position H1', () => {
            assert.equal(findCoordinates("H1"), "77");
        })

        it('find coordinate for position D6', () => {
            assert.equal(findCoordinates("D6"), "23");
        })

        it('invalid position A9', () => {
            assert.equal(findCoordinates("A9"), "");
        })

    })


    describe('calculateMovesPerTurn', () => {
        it('returns array of positions for A1', () => {
            let moves = calculateMovesPerTurn("A1")
            assert.equal(compareArrays(moves, ["B3", "C2"]), true)
        })

        it('returns array of positions for H1', () => {
            let moves = calculateMovesPerTurn("H1")
            assert.equal(compareArrays(moves, ["G3", "F2"]), true)
        })

        it('returns array of positions for D5', () => {
            let moves = calculateMovesPerTurn("D5")
            assert.equal(compareArrays(moves, ['E3', 'C3', 'E7', 'C7', 'F4', 'B4', 'F6', 'B6']), true)
        })

    })

    describe('convertCoordinatesToPosition', () => {
        it('convert coordinates [[2,1], [1,2]]', () => {
            assert.equal(compareArrays(convertCoordinatesToPosition([[2, 1], [1, 2]]), ['B6', 'C7']), true)
        })

        it('convert coordinates [[7,7], [0,0]]', () => {
            assert.equal(compareArrays(convertCoordinatesToPosition([[7, 7], [0, 0]]), ['H1', 'A8']), true)
        })

    })


    describe('possibleKnightMoves', () => {
        it('possibleKnightMoves for coordinates 21', () => {

            const moves = possibleKnightMoves("21");
            const expectedMoves = [[4, 2], [4, 0], [0, 2], [0, 0], [3, 3], [1, 3]];
            for (let i = 0; i < moves.length; i++) {
                const line = moves[i];
                const lineExpected = expectedMoves[i]
                assert.equal(compareArrays(line, lineExpected), true)
            }
        })

        it('possibleKnightMoves for coordinates 77', () => {
            const moves = possibleKnightMoves("77");
            const expectedMoves = [[5, 6], [6, 5]];
            for (let i = 0; i < moves.length; i++) {
                const line = moves[i];
                const lineExpected = expectedMoves[i]
                assert.equal(compareArrays(line, lineExpected), true)
            }
        })

        it('possibleKnightMoves for coordinates 45', () => {
            const moves = possibleKnightMoves("45");
            const expectedMoves = [[6, 6], [6, 4], [2, 6], [2, 4], [5, 7], [5, 3], [3, 7], [3, 3]];
            for (let i = 0; i < moves.length; i++) {
                const line = moves[i];
                const lineExpected = expectedMoves[i]
                assert.equal(compareArrays(line, lineExpected), true)
            }
        })

    })

    describe('resolveKnightMoves', () => {
        it('resolveKnightMoves for position A8', () => {
            const knightMoves = resolveKnightMoves("A8");
            const expectedResult = {
                position: 'A8',
                first_turn: ['B6', 'C7'],
                second_turn:
                    ['C4', 'A4', 'C8', 'A8', 'D5', 'D7', 'B5', 'E6', 'A6', 'E8']
            }
            assert.equal(knightMoves.position, expectedResult.position)
            assert.equal(compareArrays(knightMoves.first_turn, expectedResult.first_turn), true)
            assert.equal(compareArrays(knightMoves.second_turn, expectedResult.second_turn), true)
        })

        it('resolveKnightMoves for position D5', () => {
            const knightMoves = resolveKnightMoves("D5");
            const expectedResult = {
                position: 'D5',
                first_turn: ['E3', 'C3', 'E7', 'C7', 'F4', 'B4', 'F6', 'B6'],
                second_turn:
                    ['F1', 'D1', 'F5', 'D5', 'G2', 'C2', 'G4', 'C4', 'B1', 'B5', 'E2', 'A2', 'E4', 'A4',
                       'G6', 'C6', 'G8', 'C8', 'E6', 'A6', 'E8', 'A8', 'H3', 'D3', 'H5', 'H7', 'D7']
            }
            assert.equal(knightMoves.position, expectedResult.position)
            assert.equal(compareArrays(knightMoves.first_turn, expectedResult.first_turn), true)
            assert.equal(compareArrays(knightMoves.second_turn, expectedResult.second_turn ), true)

        })


    })
})


function compareArrays(array1, array2) {
    return array1.every((x) => array2.includes(x))
}