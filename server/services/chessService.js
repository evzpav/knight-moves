function ChessService(Storage) {
  this.board = [];
  this.mapping = {};

  const generateChessBoard = () => {
    const xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const board = [];

    for (let i = 8; i > 0; i -= 1) {
      const line = [];
      for (let j = 0; j < xAxis.length; j += 1) {
        const fieldName = xAxis[j] + i;
        line.push(fieldName);
      }
      board.push(line);
    }

    return board;
  };

  const createBoardMapping = () => {
    const mapping = {};
    for (let i = 0; i < this.board.length; i += 1) {
      const line = this.board[i];
      for (let j = 0; j < line.length; j += 1) {
        mapping[line[j]] = i.toString() + j.toString();
      }
    }
    return mapping;
  };

  const findCoordinates = position => {
    return this.mapping[position] ? this.mapping[position] : "";
  };

  const possibleKnightMoves = coordinatesInput => {
    if (!coordinatesInput || coordinatesInput.length < 2) {
      return [];
    }

    const positionArray = coordinatesInput.split("");
    const x = parseInt(positionArray[0], 10);
    const y = parseInt(positionArray[1], 10);
    const xPositions = [x + 2, x - 2, x + 1, x - 1].filter(c => c >= 0 && c < 8);
    const yPositions = [y + 2, y - 2, y + 1, y - 1].filter(c => c >= 0 && c < 8);

    const coordinates = [];

    for (let i = 0; i < xPositions.length; i += 1) {
      for (let j = 0; j < yPositions.length; j += 1) {
        if (Math.abs(x - xPositions[i]) + Math.abs(y - yPositions[j]) === 3) {
          if (!coordinates.includes([xPositions[i], yPositions[j]])) {
            coordinates.push([xPositions[i], yPositions[j]]);
          }
        }
      }
    }

    return coordinates;
  };

  const convertCoordinatesToPosition = knightMoves => {
    const positions = [];
    for (let i = 0; i < knightMoves.length; i += 1) {
      const move = knightMoves[i];
      positions.push(this.board[move[0]][move[1]]);
    }
    return positions;
  };

  const calculateMovesPerTurn = position => {
    const coordinates = findCoordinates(position);
    const knightMoves = possibleKnightMoves(coordinates);
    return convertCoordinatesToPosition(knightMoves);
  };

  const resolveKnightMoves = position => {
    const result = {};
    const movesFirstTurn = calculateMovesPerTurn(position);
    result.position = position;
    result.first_turn = movesFirstTurn;
    const movesSecondTurn = [];

    for (let i = 0; i < movesFirstTurn.length; i += 1) {
      movesSecondTurn.push(calculateMovesPerTurn(movesFirstTurn[i]));
    }
    const uniquePositions = [...new Set([].concat(...movesSecondTurn))];
    result.second_turn = uniquePositions;

    Storage.insertPossibleMoves(result);

    return result;
  };

  const validatePosition = position => {
    const re = new RegExp("[A-H]{1}[1-8]{1}");
    if (re.exec(position)) {
      return true;
    }
    return false;
  };

  const init = () => {
    this.board = generateChessBoard();
    this.mapping = createBoardMapping();
  };

  init();

  return {
    validatePosition,
    resolveKnightMoves,
    calculateMovesPerTurn,
    convertCoordinatesToPosition,
    possibleKnightMoves,
    findCoordinates,
    generateChessBoard,
  };
}

module.exports = ChessService;
