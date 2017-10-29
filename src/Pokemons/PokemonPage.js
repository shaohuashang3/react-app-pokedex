import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PokemonList from './PokemonList';

class PokemonPage extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          count: "",
          previous: "",
          pokemonList: [],
          next: "",
          activePage: 0,
          loading: false
        };
    }
    
    
    async getPokemonByPage(){
        try{
            await this.setState({ loading: true });
            const page = (this.state.activePage) * 20;
            const header = "https://cors-anywhere.herokuapp.com/";
            const response = await axios.get(`${header}http://pokeapi.co/api/v2/pokemon/?offset=${page}`); 
            await this.setState({ 
                count: response.data.count,
                previous: response.data.previous, 
                pokemonList: response.data.results,
                next: response.data.next,
                loading: false
            });
        } catch(err) {
            await this.setState({ loading: false });
        }
    }

    async componentDidMount() {
        await this.getPokemonByPage();
    }
    
    async componentWillMount() {
        await this.setState({activePage: this.props.match.params.page});
    }
    
    async componentWillReceiveProps(nextProps) {
        const newPage = nextProps.match.params.page;
        const oldPage = this.props.match.params.page;
    
        if (newPage !== oldPage) {
          await this.setState({activePage: newPage})
          await this.getPokemonByPage();
        }
    }
    
    render() {

        let paginationDisplay = null;

        if(this.state.pokemonList.length != 0) {
            if(this.state.activePage == 0) {
                paginationDisplay = (
                    <section>
                        <ul class="pager">
                            <li class="disabled"><span>&larr;Previous</span></li>
                            <li><Link to={`/pokemon/page/${(parseInt(this.state.activePage) + 1).toString()}`}>Next&rarr;</Link></li>  
                        </ul>   
                    </section>
                );
            } else if (this.state.activePage == Math.ceil(this.state.count / 20) - 1) {
                paginationDisplay = (
                    <section>
                        <ul class="pager">
                            <li><Link to={`/pokemon/page/${(parseInt(this.state.activePage) - 1).toString()}`}>&larr;Previous</Link></li>
                            <li class="disabled"><span>Next&rarr;</span></li>
                        </ul>   
                    </section>
                );
            }else{
                paginationDisplay = (
                    <section>
                        <ul class="pager">
                            <li><Link to={`/pokemon/page/${(parseInt(this.state.activePage) - 1).toString()}`}>&larr;Previous</Link></li>
                            <li><Link to={`/pokemon/page/${(parseInt(this.state.activePage) + 1).toString()}`}>Next&rarr;</Link></li>  
                        </ul>
                    </section>
                );
            };
        }
        

        let body = null;
        if(this.state.loading) {
            body = <div>Loading...</div>;
        }else if(this.state.pokemonList){
            body = (
                <div>
                    <PokemonList pokemons={this.state} />
                    {paginationDisplay}
                </div>
            );
        }else {
            body = <div><h3>No Pokemons</h3></div>;
        }

        return <div>{body}</div>;
    }
}

export default PokemonPage; 