function Controller(ChessService) {

    getKnightMoves = async (req, res) => {
        try {

            let position = req.params.position;

            if (!ChessService.validatePosition(position)) {
                res.status(400).json({ message: "Invalid input position" });
            }

            let possiblePositions = ChessService.resolveKnightMoves(position);
            res.status(200).json({ possiblePositions });

        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    };

    return {
        getKnightMoves
    }
};

module.exports = Controller;
