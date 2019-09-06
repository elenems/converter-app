import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PageNotFound from "../../pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
