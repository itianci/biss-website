/**
 *
 *
 * @程序入口文件[index.jsx]
 * @目录主文件，通常描述该目录与当前目录的相关配置信息
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/home/home';
import { HashRouter,hashHistory} from 'react-router-dom';
import store from './stores/index'

import './style/index.css'
import './style/style.css'

ReactDOM.render(
    <HashRouter history={hashHistory}><Index store = {store} /></HashRouter>,
    document.getElementById('app')
);