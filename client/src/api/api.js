import axios from "axios";
import config from "../config/config";

export default async function getKnightMoves(position) {
  try {
    const resp = await axios({
      method: "get",
      url: `${config.apiUrl}/api/knightmoves/${position}`,
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
  return false;
}
