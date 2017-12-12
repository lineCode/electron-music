export default function data(state = {singer: []}, action) {
    switch (action.type) {
        case 'USER_SINGER_FULFILLED':
            if (action.payload.data.state) {
                return action.payload.data.result
            } else {
                return {}
            }
        case 'ADD_SINGER':
            let sta = true;
            state.singer.map(item => {
                if (item.singerId === action.dat.singerId && item.hash === action.dat.hash) {
                    sta = false
                }
            });
            if (sta) {
                state.singer.push(action.dat);
                state.play = {...state.play, hash: action.dat.hash}
            }
            return state;
    }
    return state
}