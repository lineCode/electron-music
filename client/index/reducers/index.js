import {combineReducers} from 'redux';

import user from './user';
import singer from './singer';
import player from './player';

export default combineReducers({
    user,
    player,
    singer
});