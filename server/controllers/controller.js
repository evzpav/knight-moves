function Controller(ChessService) {
  const getKnightMoves = (req, res) => {
    try {
      const { position } = req.params;

      if (!ChessService.validatePosition(position)) {
        res.status(400).json({ message: "Invalid input position" });
        return;
      }

      const possiblePositions = ChessService.resolveKnightMoves(position);
      res.status(200).json({ possiblePositions });
    } catch (error) {
      res.status(500).end();
    }
  };

  return {
    getKnightMoves,
  };
}

module.exports = Controller;
