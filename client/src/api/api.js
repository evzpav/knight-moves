import axios from 'axios';
import config from '../config/config';

export function getKnightMoves(position) {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await axios({
                method: 'get',
                url: `${config.apiUrl}/api/knightmoves/${position}`
            });

            resolve(resp.data);

        } catch (error) {
            reject(error);
        }

    })

}

