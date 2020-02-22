
const express = require("express");
const path = require("path");

module.exports = function (app, Controller) {
    app.use('/', express.static(path.join(__dirname, '../../client/build')));
    app.get('/api/knightmoves/:position', Controller.getKnightMoves);

};
