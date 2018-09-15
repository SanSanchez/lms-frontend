// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import {App} from './components/app';

ReactDom.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('app'));
  