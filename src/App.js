import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=c09ccd3e4ccd5f8e721ef664ea21b166&q=chicken%20breast",
    base_url: "https://www.food2fork.com/api/search?key=c09ccd3e4ccd5f8e721ef664ea21b166",
    details_id: 3560,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  };

  async getRecipes(){
    try{

      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0){
        this.setState(() => {
          return {
            error: 'sorry, no results found'
          }
        })
      }else{
        this.setState(() => {
          return {
            recipes: jsonData.recipes
          }
        })
      }

    }catch(error){
      console.log(error);
    }

  }
  componentDidMount(){
    this.getRecipes();
  }

  displayPage = (index) => {
    switch(index){
      default:
      case 1:
        return (
          <RecipeList
           recipes={this.state.recipes}
           handleDetails={this.handleDetails}
           value={this.state.search}
           handleChange={this.handleChange}
           handleSubmit={this.handleSubmit}
           error={this.state.error}

          />
        )
      case 0:
        return (
          <RecipeDetails
           id={this.state.details_id}
           handleIndex = {this.handleIndex}  />
        )
    }
  }

  handleIndex = (index) => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange = (e) => {
    console.log("hello from handle change");
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(() => {
      return {
        url: `${base_url}${query}${search}`,
        search:""
      }
    }, () => {
      this.getRecipes();
    })
  }


  render() {
    return (
     <React.Fragment>
       {this.displayPage(this.state.pageIndex)}

     </React.Fragment>
    );
  }
}

export default App;
