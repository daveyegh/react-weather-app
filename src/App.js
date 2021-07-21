import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Weather from "./components/Weather";
import CityInfo from "./components/CityInfo";
import Navigation from "./components/Header";
import HomePage from "./pages/HomePage";
import AddCity from "./pages/AddCity";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
      </div>
      
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/cities" exact component={Weather} />
        <Route path="/cities/:name" component={CityInfo} />
        <Route path="/addCity" exact component={AddCity} />
      </Switch>
    </Router>
  );
}

export default App;
