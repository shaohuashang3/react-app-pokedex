import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class PokemonList extends Component {

    render() {
        const { pokemons } = this.props;
    
        if (pokemons.pokemonList.length === 0) {
          return <small>No pokemon yet!</small>;
        }

        const pokenmonDisplays = pokemons.pokemonList.map((pokemon) => {
          const description = (
            <ul>
              <li><b>name:</b> {pokemon.name}</li>
            </ul>
          );

          const pokemonId = pokemon.url.substr(pokemon.url.indexOf("pokemon")+8).replace("/","");
        
          let picture = null;
          if (pokemonId < 10) {
            picture = (
              <Link to={`/pokemon/${pokemonId}`}><img
              className="img-responsive"
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${pokemonId}.png`}
              alt={pokemon.name}
            /></Link>);
          } else if (pokemonId > 9 && pokemonId < 100) {
            picture = (
              <Link to={`/pokemon/${pokemonId}`}><img
                className="img-responsive"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${pokemonId}.png`}
                alt={pokemon.name}
              /></Link>);
          } else if (pokemonId < 721){
            picture = (
              <Link to={`/pokemon/${pokemonId}`}><img
                className="img-responsive"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`}
                alt={pokemon.name}
              /></Link>); 
          }
          
          return (
            <div className="col-sm-4 col-md-4" key={pokemonId}>
              <h3>
                <Link to={`/pokemon/${pokemonId}`}>{pokemon.name}</Link>
              </h3>
              {picture}
              <p><b>#{pokemonId}</b></p>
              {description}
            </div>
          );
                  
        });

        return (
          <section>
            <div className="row">
              <div>  
                <h2>Pokenmons</h2> 
                  <p><b>previous:</b> {pokemons.previous}</p>
                  <p><b>next:</b> {pokemons.next}</p>
                  <div className="row">{pokenmonDisplays}</div>
              </div>
            </div>
          
          </section>
        );
    }
}

export default PokemonList;