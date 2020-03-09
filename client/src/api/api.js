import axios from "axios";
import config from "../config/config";

export default async function getKnightMoves(position) {
  const resp = await axios({
    method: "get",
    url: `${config.apiUrl}/api/knightmoves/${position}`,
  });

  return resp.data;
}
