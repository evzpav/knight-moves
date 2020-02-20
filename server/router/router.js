const ChessService = require('../services/chessService')();
const Controller = require('../controllers/controller')(ChessService);
const express = require("express");
const path = require("path");

module.exports = function (app) {
    app.use('/', express.static(path.join(__dirname, '../../client/build')));
    app.get('/api/knightmoves/:position', Controller.getKnightMoves);

};
