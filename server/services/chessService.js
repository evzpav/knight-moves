function ChessService() {

    this.board = [];
    this.mapping = {};


    generateChessBoard = () => {
        const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const board = [];

        for (let i = 8; i > 0; i--) {
            let line = [];
            for (let j = 0; j < xAxis.length; j++) {
                let fieldName = xAxis[j] + i
                line.push(fieldName);
            }
            board.push(line);
        }

        return board;
    }

    createBoardMapping = () => {
        let mapping = {};
        for (let i = 0; i < this.board.length; i++) {
            const line = this.board[i];
            for (let j = 0; j < line.length; j++) {
                mapping[line[j]] = i + "" + j;
            }
        }
        return mapping;
    }



    findCoordinates = (position) => {
        return this.mapping[position] ? this.mapping[position] : "";
    }

    possibleKnightMoves = (coordinatesInput) => {
        if (!coordinatesInput || coordinatesInput.length < 2) {
            return [];
        }

        let positionArray = coordinatesInput.split("");
        let x = parseInt(positionArray[0]);
        let y = parseInt(positionArray[1]);
        let xPositions = [x + 2, x - 2, x + 1, x - 1].filter(c => c >= 0 && c < 8);
        let yPositions = [y + 2, y - 2, y + 1, y - 1].filter(c => c >= 0 && c < 8);

        var coordinates = [];

        for (var i = 0; i < xPositions.length; i++) {
            for (var j = 0; j < yPositions.length; j++) {
                if (Math.abs(x - xPositions[i]) + Math.abs(y - yPositions[j]) === 3) {
                    if (!coordinates.includes([xPositions[i], yPositions[j]])) {
                        coordinates.push([xPositions[i], yPositions[j]]);
                    }
                }
            }
        }

        return coordinates;
    }


    convertCoordinatesToPosition = (knightMoves) => {
        let positions = [];
        for (let i = 0; i < knightMoves.length; i++) {
            const move = knightMoves[i];
            positions.push(this.board[move[0]][move[1]]);
        }
        return positions;
    }


    calculateMovesPerTurn = (position) => {
        let coordinates = findCoordinates(position)
        let knightMoves = possibleKnightMoves(coordinates)
        return convertCoordinatesToPosition(knightMoves)
    }

    validatePosition = (position) => {
        let re = new RegExp('[A-H]{1}[1-8]{1}');
        return re.exec(position) ? true : false;
    }

    resolveKnightMoves = (position) => {
        let result = {};
        let movesFirstTurn = calculateMovesPerTurn(position);
        result["position"] = position;
        result["first_turn"] = movesFirstTurn;
        let movesSecondTurn = [];

        for (let i = 0; i < movesFirstTurn.length; i++) {
            movesSecondTurn.push(calculateMovesPerTurn(movesFirstTurn[i]));
        }
        let uniquePositions = [...new Set([].concat(...movesSecondTurn))];
        result["second_turn"] = uniquePositions;

        return result;
    }

    validatePosition = (position) => {
        let re = new RegExp('[A-H]{1}[1-8]{1}');
        return re.exec(position) ? true : false;
    }

    init = () => {
        this.board = generateChessBoard();
        this.mapping = createBoardMapping();
    }

    init();

    return {
        validatePosition,
        resolveKnightMoves,
        calculateMovesPerTurn,
        convertCoordinatesToPosition,
        possibleKnightMoves,
        findCoordinates,
        generateChessBoard
    }

}

module.exports = ChessService;
