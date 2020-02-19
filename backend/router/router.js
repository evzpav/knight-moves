const Service = require('../services/service')();
const Controller = require('../controllers/controller')(Service);
const express = require("express");
const path = require("path");

module.exports = function (app) {
    app.use('/', express.static(path.join(__dirname, '../../frontend/build')));
    app.get('/api/knightmoves/:position', Controller.getKnightMoves);

};
