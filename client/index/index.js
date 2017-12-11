import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import './public/css/nprogress.css'
import Index from './components/index'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Index/>
    </Provider>, document.getElementById("app")
);