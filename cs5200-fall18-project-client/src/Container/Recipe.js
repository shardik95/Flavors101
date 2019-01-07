import React from "react";
import IngredientService from "../Services/IngredientService";
import PersonService from "../Services/PersonService";
import RecipeService from "../Services/RecipeService";

class Recipe extends React.Component {

    constructor(props){
        super(props);
        this.state={
            user:'',
            session:'',
            recipies:[],
            create:false,
            list:false,
            update:false,
            name:'',
            steps:'',
            prepTime:'',
            cookTime:'',
            updateRecipe:'',
            nameU:'',
            stepsU:'',
            prepTimeU:'',
            cookTimeU:''
        }
        this.personService=PersonService.instance
        this.logout=this.logout.bind(this)
        this.recipeService=RecipeService.instance;
        this.listRecipies=this.listRecipies.bind(this);
        this.addRecipies=this.addRecipies.bind(this);
        this.deleteRecipe=this.deleteRecipe.bind(this);
        this.update=this.update.bind(this);
        this.updateRecipe=this.updateRecipe.bind(this)
    }


    componentDidMount(){

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })

    }

    componentWillReceiveProps(newProps){

        this.personService.getSession()
            .then(response=>{
                if(response.username!=='CANNOT FIND'){
                    this.setState({user:response,session:true})
                }
            })
    }

    deleteRecipe(id){
        this.recipeService.deleteRecipe(id)
            .then(()=>this.recipeService.getRecipeForChef(this.state.user.id)
            .then(igs=>this.setState({recipies:igs,list:true,create:false})))
    }

    update(igs){
        this.setState({updateRecipe:igs,update:true,create:false,list:false})
    }

    listRecipies(){
        this.recipeService.getRecipeForChef(this.state.user.id)
            .then(igs=>this.setState({recipies:igs,list:true,create:false,update:false}))
    }

    addRecipies(){
        this.setState({create:true,list:false,update:false})
    }

    create(){
        let recipe={
            name:this.state.name,
            steps:this.state.steps,
            prepTime:this.state.prepTime,
            cookTime:this.state.cookTime
        }

        this.recipeService.createRecipe(recipe,this.state.user.id)
            .then(()=>this.recipeService.getRecipeForChef(this.state.user.id)
            .then(igs=>this.setState({recipies:igs}))
            .then(()=>alert("created")))
    }

    updateRecipe(){

        let indgre={
            name:this.state.nameU,
            steps:this.state.stepsU,
            prepTime:this.state.prepTimeU,
            cookTime:this.state.cookTimeU,
            id:this.state.updateRecipe.id
        }

        console.log(indgre)

        this.recipeService.updateRecipe(indgre)
            .then(i=>console.log(i))
            .then(()=>this.recipeService.getRecipeForChef(this.state.user.id)
                .then(igs=>this.setState({recipies:igs}))
                .then(()=>alert("updated")))

    }

    logout(){
        this.personService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/")
    }

    render(){
        return(
            <div>
                <br/>
                <button className="btn btn-outline-dark "
                        onClick={()=>this.listRecipies()}>List Recipies</button>
                <br/><br/>
                <button className="btn btn-outline-dark "
                        onClick={()=>this.addRecipies()}>Add a Recipe</button>

                <br/><br/>
                {this.state.create===true && <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Enter the Recipe</h4>
                        <div>
                            <label>Name</label>
                            <input className="form-control"
                                   placeholder="Name" onChange={(e)=>this.setState({name:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>PrepTime</label>
                            <input className="form-control"
                                   placeholder="preparation time" onChange={(e)=>this.setState({prepTime:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>CookTime</label>
                            <input className="form-control"
                                   placeholder="Cook Time" onChange={(e)=>this.setState({cookTime:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>Steps</label>
                            <input className="form-control"
                                   placeholder="Cook Time" onChange={(e)=>this.setState({steps:e.target.value})}/>
                        </div>
                        <br/>

                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.create()}>Create</button>
                    </div>
                </div>}


                <ul className="list-group">
                    {this.state.list===true && this.state.recipies.length>0 &&
                    this.state.recipies.map((igs,index)=>(
                        <li className="list-group-item"  key={index}>
                            <span>Name: {igs.name}</span><br/>
                            <span>Steps: {igs.steps}</span><br/>
                            <span>Prep Time: {igs.prepTime}</span><br/>
                            <span>Cook Time: {igs.cookTime}</span>
                            <button className="btn btn-outline-dark float-right"  onClick={()=>this.update(igs)}>Update</button>
                            <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteRecipe(igs.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                {this.state.update===true && <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Enter the Recipe</h4>
                        <div>
                            <label>Name</label>
                            <input className="form-control" defaultValue={this.state.updateRecipe.name}
                                   placeholder="Name" onChange={(e)=>this.setState({nameU:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>Steps</label>
                            <input className="form-control" defaultValue={this.state.updateRecipe.steps}
                                   placeholder="Steps" onChange={(e)=>this.setState({stepsU:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>PrepTime</label>
                            <input className="form-control" defaultValue={this.state.updateRecipe.prepTime}
                                   placeholder="PrepTime" onChange={(e)=>this.setState({prepTimeU:e.target.value})}/>
                        </div>
                        <br/>

                        <div>
                            <label>CookTime</label>
                            <input className="form-control" defaultValue={this.state.updateRecipe.cookTime}
                                   placeholder="CookTime" onChange={(e)=>this.setState({cookTimeU:e.target.value})}/>
                        </div>
                        <br/>
                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateRecipe()}>Update</button>
                    </div>
                </div>}


            </div>
        )
    }
}

export default Recipe;