/**
 * Created by developer on 16/10/26.
 */
import {Axios} from 'Public'

/**
 * @param userSinger // 这里获取用户的在线听歌数据(token取用户数据，无需传值)
 */
export const userSinger = () => dispatch => {
    return dispatch(
        {
            type: 'USER_SINGER',
            payload: Axios.get('/userSinger')
        }
    )
};

export const addSinger = (dat) => {
    return { type: 'ADD_SINGER', dat: dat };
};


export const play = () => {
    return { type: 'PLAYER', state: 'PLAYER_PLAY' };
};

export const pause = () => {
    return { type: 'PLAYER', state: 'PLAYER_PAUSE' };
};


export default {
    userSinger,
    addSinger,
    play,
    pause,
}