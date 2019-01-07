import React from 'react';
import YummlyService from "../Services/YummlyService";

class YummlyRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profileUserId:'',
            recipe:'',
            recipeId:''
        }

        this.yummlyService = YummlyService.instance
    }

    componentDidMount(){

        let profileUserId=this.props.match.params.userId;
        this.setState({profileUserId:profileUserId});

        let recipeId = this.props.match.params.recipeId;
        this.setState({recipeId: recipeId})

        this.yummlyService.getYummlyRecipe(this.props.match.params.recipeId)
            .then(res => this.setState({recipe: res}))

    }

    componentWillReceiveProps(newProps){

        let profileUserId=newProps.match.params.userId;
        this.setState({profileUserId:profileUserId});

        let recipeId = newProps.match.params.recipeId;
        this.setState({recipeId: recipeId})

        this.yummlyService.getYummlyRecipe(newProps.match.params.recipeId)
            .then(res => this.setState({recipe:res}))

    }

    render(){
        return(
            <div>
                <h4 style={{textAlign:'center'}}>{this.state.recipe.name}</h4>

                <img src={this.state.recipe.images!== undefined? this.state.recipe.images[0].imageUrlsBySize[360]:undefined} style={{justifyContent: 'center',
                    alignItems: 'center', width: '100px', height:'100px'}}/>
                <hr/>
                <div className="row" style={{textAlign:'center'}}>
                    <div className="col-4"><h6>PREP TIME:</h6>
                        {this.state.recipe.prepTime !== undefined && <p><i>{this.state.recipe.prepTime}</i></p>}
                        {this.state.recipe.prepTime === undefined && <p><i>-</i></p>}</div>
                    <div className="col-4"><h6>COOK TIME:</h6>
                        {this.state.recipe.cookTime !== undefined && <p><i>{this.state.recipe.cookTime}</i></p>}
                        {this.state.recipe.cookTime === undefined && <p><i>-</i></p>}</div>
                    <div className="col-4"><h6>TOTAL TIME:</h6>
                        {this.state.recipe.totalTime !== undefined && <p><i>{this.state.recipe.totalTime}</i></p>}
                        {this.state.recipe.totalTime === undefined && <p><i>-</i></p>}</div>
                </div>
                <hr/>
                <h6>Number of Servings: {this.state.recipe.numberOfServings}</h6>
                <hr/>
                <h4>INGREDIENTS:</h4>
                <ul>
                    {this.state.recipe.ingredientLines !==undefined && this.state.recipe.ingredientLines.length>0 && this.state.recipe.ingredientLines.map((ing,index)=>
                        <li key={index}>{ing}</li>)}
                </ul>
                <hr/>
                <h4>DIRECTIONS:</h4>
                <p>Click <a href={this.state.recipe.source !== undefined ? this.state.recipe.source.sourceRecipeUrl:undefined} target="_blank" >here</a> for directions to make {this.state.recipe.name}</p>
                <hr/>
                <br/>
            </div>)

    }
}

export default YummlyRecipe