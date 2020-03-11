import * as express from "express";
import * as path from "path";

export const router = (app, Controller): any => {
  app.use("/", express.static(path.join(__dirname, "../../client/build")));
  app.get("/api/knightmoves/:position", Controller.getKnightMoves);
};
