import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Todo from './Components/Todo';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;