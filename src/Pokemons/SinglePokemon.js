import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";

class SinglePokemon extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          pokemon: undefined,
          loading: false,
          error: false
        };
    }

    async loadPokemonById(pokemonId) {
        try {
          await this.setState({ loading: true });
          const header = "https://cors-anywhere.herokuapp.com/";
          const response = await axios.get(`${header}http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const pokemon = response.data;
          await this.setState({ loading: false, pokemon });
        } catch (e) {
          await this.setState({ loading: false, error: true });
        }
    }

    async componentDidMount() {
        const pokemonId = this.props.match.params.id;
        await this.loadPokemonById(pokemonId);
    }
    
    async componentWillReceiveProps(nextProps) {
        const pokemonId = nextProps.match.params.id;
        const oldPokemonId = this.props.match.params.id;

        if (pokemonId !== oldPokemonId) {
          await this.loadPokemonById(pokemonId);
        }
    }

    render() {
        if(this.state.error) {
            return <Redirect to="/error/"/>
        }
        let body = null;
        if (this.state.loading) {
            body = <div>Loading...</div>;
        }else if (this.state.pokemon) {
            //const url = this.props.match.url;
            let picture = null;
            if (this.state.pokemon.id < 10) {
              picture = (
                <img
                className="img-responsive"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${this.state.pokemon.id}.png`}
                alt={this.state.pokemon.name}
              />);
            } else if (this.state.pokemon.id > 9 && this.state.pokemon.id < 100) {
              picture = (
                <img
                  className="img-responsive"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${this.state.pokemon.id}.png`}
                  alt={this.state.pokemon.name}
                />);
            } else if (this.state.pokemon.id < 721){
              picture = (
                <img
                  className="img-responsive"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.state.pokemon.id}.png`}
                  alt={this.state.pokemon.name}
                />); 
            }

            const typesDisplays = this.state.pokemon.types.map((type) => {
                const typeList = (
                    <ul class="pager">
                        <li>{type.type.name}</li>
                    </ul>
                )
                return typeList
            });

            body = (
                <section>
                  <div className="container">
                    <div className="row">
                        <div className="col-xs-3"></div>

                        <div className="col-xs-3">   
                            <h3>{(this.state.pokemon.name).toUpperCase()}</h3>
                            {picture}
                        </div>

                        <div className="col-xs-3">
                            <div className="col-xs-3">
                                <h4><b>Type</b></h4>
                                {typesDisplays}
                            </div>
                            <div className="col-xs-6">
                                <ul>
                                    <li><b>Id:</b> {this.state.pokemon.id}</li>
                                    <li><b>Order:</b> {this.state.pokemon.order}</li>
                                    <li><b>Height:</b> {this.state.pokemon.height}</li>
                                    <li><b>Weight:</b> {this.state.pokemon.weight}</li>
                                    <li><b>Base experience:</b> {this.state.pokemon.base_experience}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-3"></div>
                  </div>
                  </div>
                </section>
              );
        }else {
            body = <div><h3>No such Pokemon</h3></div>;
        }
      
        return <div>{body}</div>;
        
    }
}



export default SinglePokemon; 