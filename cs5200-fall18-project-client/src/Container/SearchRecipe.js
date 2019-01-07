import React from "react";
import {Link} from "react-router-dom";
import YummlyRecipe from "./YummlyRecipe";
import YummlyService from "../Services/YummlyService";

class SearchRecipe extends React.Component{

    constructor(props){
        super(props)
        this.state={
            profileUserId:'',
            recipes:'',
            searchRecipeQuery:'',
            recipeId:''
        }
        this.yummlyService = YummlyService.instance;
        this.searchRecipe = this.searchRecipe.bind(this);
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;
        this.setState({profileUserId:profileUserId});

    }

    componentWillReceiveProps(newProps){
        let profileUserId=newProps.match.params.userId;
        this.setState({profileUserId:profileUserId});
    }

    searchRecipe(){
        this.yummlyService.searchRecipes(this.state.searchRecipeQuery)
            .then(res => this.setState({recipes: res.matches, recipeId:res.id}))
            .then(console.log(this.state.recipeId))
        // .then(console.log(this.state.recipes))
    }

    render(){
        let searchElement;
        return(
            <div>
                <br/>
                <input className = "form-control mr-sm-2" type="search" placeholder="Search Recipes"
                       ref={node=>searchElement=node} onChange={()=>{
                           return this.setState({searchRecipeQuery:searchElement.value})
                        }}/>
                <br/>
                <button className="btn btn-outline-dark btn-block" onClick={()=>this.searchRecipe()} type="button">Search</button>
                <ul className="list-group">
                    {this.state.recipes.length>0 && this.state.recipes.map((matches,index) =>
                        <li className="list-group-item" key={index}>
                            <Link to={`/profile/${this.state.profileUserId}/searchRecipe/${matches.id}`}>{matches.recipeName}</Link>
                        </li>)}
                 </ul>
            </div>
        )
    }

}

export default SearchRecipe;