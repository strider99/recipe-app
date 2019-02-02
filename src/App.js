import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=c09ccd3e4ccd5f8e721ef664ea21b166&q=chicken%20breast",
    details_id: 3560,
    pageIndex: 1
  };

  async getRecipes(){
    try{

      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
        recipes: jsonData.recipes
      });
    }catch(error){
      console.log(error);
    }

  }
  // componentDidMount(){
  //   this.getRecipes();
  // }

  displayPage = (index) => {
    switch(index){
      default:
      case 1:
        return (
          <RecipeList
           recipes={this.state.recipes}
           handleDetails={this.handleDetails} />
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


  render() {
    return (
     <React.Fragment>
       {this.displayPage(this.state.pageIndex)}

     </React.Fragment>
    );
  }
}

export default App;
