import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=c09ccd3e4ccd5f8e721ef664ea21b166&q=chicken%20breast",
    details_id: 3560
  };

  // async getRecipes(){
  //   try{

  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     this.setState({
  //       recipes: jsonData.recipes
  //     });
  //   }catch(error){
  //     console.log(error);
  //   }

  // }
  // componentDidMount(){
  //   this.getRecipes();
  // }
  render() {
    return (
     <React.Fragment>
       {/* <RecipeList recipes={this.state.recipes} /> */}
       <RecipeDetails id={this.state.details_id} />
     </React.Fragment>
    );
  }
}

export default App;
