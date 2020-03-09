function Controller(ChessService) {
  const getKnightMoves = (req, res) => {
    try {
      const { position } = req.params;

      if (!ChessService.validatePosition(position)) {
        return res.status(400).json({ message: "Invalid input position" });
      }

      const possiblePositions = ChessService.resolveKnightMoves(position);
      return res.status(200).json({ possiblePositions });
    } catch (error) {
      return res.status(500).end();
    }
  };

  return {
    getKnightMoves,
  };
}

module.exports = Controller;
