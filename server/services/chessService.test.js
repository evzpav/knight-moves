const cs = require("./chessService")();

// test('resolvePossibleKnightMovesPerTurn', () => {
//     expect(cs.resolvePossibleKnightMovesPerTurn("H1")).toEqual(['G3', 'F2']);
//     expect(cs.resolvePossibleKnightMovesPerTurn("A8")).toEqual(['B6', 'C7']);

//     let movesD5 = cs.resolvePossibleKnightMovesPerTurn("D5");
//     movesD5.forEach(m => {
//         expect(['C7', 'E7', 'C3', 'E3', 'B6', 'B4', 'F6', 'F4']).toContain(m);
//     })
// });


// test('findCoordinates', () => {
//     expect(cs.findCoordinates("A8").bind(cs)).toBe("00");
//     // expect(cs.findCoordinates("H1")).toBe("77");
//     // expect(cs.findCoordinates("T9")).toBe("");
//     // expect(cs.findCoordinates("D5")).toBe("33");
// })


// test('possibleKnightMoves', () => {
//     let moves = cs.possibleKnightMoves("00");


// })

test('convertCoordinatesToPosition', () => {
    let position = cs.convertCoordinatesToPosition([0,0]).bind(cs);
    console.log("POSITION: ", position)

})



// test('translateCoordinatesToPosition', () => {
//     expect(cs.translateCoordinatesToPosition("00")).toBe("A8")
// })

function compareArrays(array1, array2) {
    return array1.every((x)=>array2.includes(x))
}