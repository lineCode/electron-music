import {combineReducers} from 'redux';

import user from './user';
import player from './player';

export default combineReducers({
    user,
    player
});