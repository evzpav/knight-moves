export function ChessService(Storage: any) {
  this.board = [];
  this.mapping = {};

  const generateChessBoard = () => {
    const xAxis: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const board: string[][] = [];

    for (let i = 8; i > 0; i -= 1) {
      const line: string[] = [];
      for (let j = 0; j < xAxis.length; j += 1) {
        const fieldName: string = xAxis[j] + i;
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

  const findCoordinates = (position: string | number) => {
    return this.mapping[position] ? this.mapping[position] : "";
  };

  const possibleKnightMoves = (coordinatesInput: string) => {
    if (!coordinatesInput || coordinatesInput.length < 2) {
      return [];
    }

    const positionArray = coordinatesInput.split("");
    const x: number = parseInt(positionArray[0], 10);
    const y: number = parseInt(positionArray[1], 10);
    const xPositions: number[] = [x + 2, x - 2, x + 1, x - 1].filter(c => c >= 0 && c < 8);
    const yPositions: number[] = [y + 2, y - 2, y + 1, y - 1].filter(c => c >= 0 && c < 8);

    const coordinates: number[][] = [];

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

  const convertCoordinatesToPosition = (knightMoves: number[][]) => {
    const positions: string[] = [];
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

  const resolveKnightMoves = async (position: string) => {
    interface Result {
      position: string;
      first_turn: string[];
      second_turn: string[];
    }

    const result: Result = {
      position: "",
      first_turn: [],
      second_turn: [],
    };

    const foundSavedMove: Result = await Storage.findPossibleMoves(position);
    if (foundSavedMove && foundSavedMove.position) {
      return foundSavedMove;
    }

    const movesFirstTurn = calculateMovesPerTurn(position);
    result.position = position;
    result.first_turn = movesFirstTurn;

    let set: any = new Set();
    let uniquePositions: string[] = [];
    for (let i = 0; i < movesFirstTurn.length; i += 1) {
      uniquePositions.push(...calculateMovesPerTurn(movesFirstTurn[i]));
      set.add(uniquePositions);
    }
    const secondTurn: string[][] = Array.from(set);

    if (secondTurn.length > 0) {
      result.second_turn = secondTurn[0];
    }

    Storage.insertPossibleMoves(result);

    return result;
  };

  const validatePosition = (position: string) => {
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
