import axios from 'axios'
import NProgress from 'nprogress'
import Promise from 'bluebird';
import {message} from 'antd';
window.Promise = Promise;
Promise.config({
    longStackTraces: true,
    warnings: false // note, run node with --trace-warnings to see full stack traces for warnings
});
/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function get(url) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5)
        NProgress.inc()
        axios.get('http://127.0.0.1:3000'+url).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            switch (error.response.status){
                case 500:
                    message.error(error.response.data.error);
                    NProgress.done();
                    break;
                case 401:
                    message.warn('用户信息失效！');
                    NProgress.done();
                    window.location = 'index.html#/login'
                    break;
                default:
                    message.warn('一个错误！');
                    console.log(JSON.stringify(error));
                    break;
            }
            reject()
        });
    })
}

function post(url, parms) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        NProgress.set(0.5)
        
        NProgress.inc()
        axios.post('http://127.0.0.1:3000'+url, parms).then(res => {
            NProgress.done();
            resolve(res.data)
        }).catch(function (error) {
            switch (error.response.status){
                case 500:
                    message.error(error.response.data.error);
                    NProgress.done();
                    break;
                case 401:
                    message.warn('用户信息失效！');
                    NProgress.done();
                    window.location = 'index.html#/login'
                    break;
                default:
                    message.warn('一个错误！');
                    console.log(JSON.stringify(error));
                    break;
            }
            reject()
        });
    })
}

export {
    get,
    post
}
