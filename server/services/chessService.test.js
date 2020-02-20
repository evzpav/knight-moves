const { validatePosition, findCoordinates, calculateMovesPerTurn } = require("./chessService")();
const assert = require('chai').assert


describe('Chess Service tests', () => {
    describe('validatePosition', () => {
        it('validate valid positions', () => {
            assert.equal(validatePosition("A8"), true)
            assert.equal(validatePosition("H1"), true)
        })

        it('validate invalid positions', () => {
            assert.equal(validatePosition("A9"), false)
            assert.equal(validatePosition("a1"), false)
            assert.equal(validatePosition("Z1"), false)
        })
    })

    describe('findCoordinates', () => {
        it('find valid positions', () => {
            assert.equal(findCoordinates("A8"), "00")
            assert.equal(findCoordinates("H1"), "77")
            assert.equal(findCoordinates("D6"), "23")

        })

        it('invalid positions', () => {
            assert.equal(findCoordinates("A9"), "")
        })
    })


    describe('calculateMovesPerTurn', () => {
        it('returns arrays with positions', () => {
            let moves = calculateMovesPerTurn("A1")
            assert.equal(compareArrays(moves, ["B3", "C2"]), true)
            
            moves = calculateMovesPerTurn("H1")
            assert.equal(compareArrays(moves, ["G3", "F2"]), true)

            moves = calculateMovesPerTurn("D5")
            assert.equal(compareArrays(moves, [ 'E3', 'C3', 'E7', 'C7', 'F4', 'B4', 'F6', 'B6' ]), true)

        })

    })
})


function compareArrays(array1, array2) {
    return array1.every((x) => array2.includes(x))
}