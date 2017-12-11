/**
 * @author lw
 */
export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.payload;
    }
    return state;
};