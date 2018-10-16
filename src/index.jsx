import React from 'react';
import ReactDOM from 'react-dom';
import 'create-react-class';
import { Router, Route, browserHistory } from 'react-router';
import 'core-js';

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/dash' component={Dash} />
    </Router>,
    document.getElementById('root')
);
