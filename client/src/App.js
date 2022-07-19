import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Create from "./components/create/Create"; 

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Switch>
        <Route path="/pokemons/:id" component={Detail}/>
        <Route path="/create" component={Create}/> 
      </Switch>
    </React.Fragment>
  );
}

export default App;
