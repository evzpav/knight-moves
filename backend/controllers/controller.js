function Controller(Service) {

    getKnightMoves = async (req, res) => {
        try {
            let position = req.query.position;

            let possiblePositions = Service.resolveKnightMoves(position);
            res.status(200).json(possiblePositions);

        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    };

    return {
        getKnightMoves
    }
};

module.exports = Controller;
