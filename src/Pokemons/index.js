import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PokemonPage from "./PokemonPage";
import SinglePokemon from "./SinglePokemon";

class Pokemons extends Component {

  render() {

    //const { match } = this.props;
    //const { url } = match;

    return (
      <div className="row">
        <Switch>
          <Route path={`/pokemon/page/:page`} component={PokemonPage} />
          <Route path={`/pokemon/:id`} component={SinglePokemon}/>  
        </Switch>
        <hr/>
        <h3>
            <Link to={`/`}>Back to First Page</Link>
        </h3>
      </div>
      
    );
  }
}

export default Pokemons;