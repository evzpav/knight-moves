export function Controller(ChessService: any) {
  const getKnightMoves = async (req: any, res: any) => {
    try {
      const { position } = req.params;

      if (!ChessService.validatePosition(position)) {
        return res.status(400).json({ message: "Invalid input position" });
      }

      const possiblePositions = await ChessService.resolveKnightMoves(position);
      
      return res.status(200).json({ possiblePositions });
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };

  return {
    getKnightMoves,
  };
}
