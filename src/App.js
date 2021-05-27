import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Users from './users';
import EditUser from './editUser';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route exact path="/edit">
            <EditUser />
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
