/**
 * Created by developer on 16/10/26.
 */
import axios from 'axios'

/**
 * @param login
 */
export const login = () => dispatch => {
    return dispatch(
        {
            type: 'LOGIN',
            payload: {a:1}
        }
    )
};
/**
 * @param register
 */
export const register = dat => dispatch => {
    return dispatch(
        {
            type: 'REGISTER',
            payload: axios.post('/api/register.json', dat)
        }
    )
};
/**
 * @param addBlog
 */
export const addBlog = dat => dispatch => {
    return dispatch(
        {
            type: 'ADD_BLOG',
            payload: axios.post('/api/add-blog.json', dat)
        }
    )
};
/**
 * @param getBlog
 */
export const getBlog = (page, search) => dispatch => {
    return dispatch(
        {
            type: 'GET_BLOG',
            payload: axios.get(`/api/get-blog.json/${page}/${search}`)
        }
    )
};
/**
 * @param getOneBlog
 */
export const getOneBlog = blog_id => dispatch => {
    return dispatch(
        {
            type: 'GET_ONE_BLOG',
            payload: axios.get(`/api/get-one-blog.json/${blog_id}`)
        }
    )
};

export function play() {
    return { type: 'PLAYER', state: 'PLAYER_PLAY' };
}

export function pause() {
    return { type: 'PLAYER', state: 'PLAYER_PAUSE' };
}

export default {
    login: login,
    register: register,
    addBlog: addBlog,
    getBlog: getBlog,
    getOneBlog: getOneBlog,
}