import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, HashRouter as Router, Redirect} from 'react-router-dom'
import './public/css/nprogress.css'
import Index from './components/index'

ReactDOM.render(
    <Router>
        <Index/>
    </Router>, document.getElementById("app")
);