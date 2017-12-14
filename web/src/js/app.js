import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './landing/Landing';
import Detail from './detail/Detail';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Landing} />
            <Route path="/:id" component={Detail} />
        </div>
    </Router>,
    document.getElementById('app')
);