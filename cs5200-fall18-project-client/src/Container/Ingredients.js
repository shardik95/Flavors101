import React from "react";
import PersonService from "../Services/PersonService";
import IngredientService from "../Services/IngredientService";

class Ingredients extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            session:'',
            name:'',
            type:'',
            nutrition:'',
            create:false,
            ingredients:[],
            list:false,
            updateIg:'',
            update:false,
            nameU:'',
            typeU:'',
            nutritionU:''
        }
        this.personService=PersonService.instance
        this.logout=this.logout.bind(this)
        this.listIngredients=this.listIngredients.bind(this);
        this.addIngredient=this.addIngredient.bind(this);
        this.create = this.create.bind(this);
        this.ingredientService=IngredientService.instance;
        this.deleteIngredient=this.deleteIngredient.bind(this);
        this.update=this.update.bind(this);
        this.updateIg=this.updateIg.bind(this);
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

    deleteIngredient(id){
        this.ingredientService.deleteIngredient(id)
            .then(()=>this.ingredientService.getAllIngredients()
            .then(igs=>this.setState({ingredients:igs,list:true,create:false})))
    }

    update(igs){
        this.setState({updateIg:igs,update:true,create:false,list:false})
    }


    listIngredients(){
        this.ingredientService.getAllIngredients()
        .then(igs=>this.setState({ingredients:igs,list:true,create:false,update:false}))
    }

    addIngredient(){
        this.setState({create:true,list:false,update:false})
    }

    create(){
       let indgre={
           name:this.state.name,
           type:this.state.type,
           nutrition:this.state.nutrition
        }

        this.ingredientService.createIngredient(indgre)
            .then(()=>this.ingredientService.getAllIngredients())
            .then(igs=>this.setState({ingredients:igs}))
            .then(()=>alert("created"))
    }

    updateIg(){

        let indgre={
            name:this.state.nameU,
            type:this.state.typeU,
            nutrition:this.state.nutritionU,
            id:this.state.updateIg.id
        }

        this.ingredientService.updateIngredient(indgre)
            .then(i=>console.log(i))
            .then(()=>this.ingredientService.getAllIngredients())
            .then(igs=>this.setState({ingredients:igs}))
            .then(()=>alert("Updated"))

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
                        onClick={()=>this.listIngredients()}>List Ingredients</button>
                <br/><br/>
                <button className="btn btn-outline-dark "
                        onClick={()=>this.addIngredient()}>Add a Ingredient</button>

                <br/><br/>
                {this.state.create===true && <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Enter the Ingredient</h4>
                        <div>
                            <label>Name</label>
                            <input className="form-control"
                                   placeholder="Name" onChange={(e)=>this.setState({name:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>Veg / Non veg?</label>
                            <select className="form-control" onChange={(e)=>this.setState({type:e.target.value})}>
                                <option>Select</option>
                                <option>Vegetarian</option>
                                <option>Non-Vegetarian</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label>Nutrition</label>
                            <input className="form-control"
                                   placeholder="Nutrition" onChange={(e)=>this.setState({nutrition:e.target.value})}/>
                        </div>
                        <br/>

                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.create()}>Create</button>
                    </div>
                </div>}

                <ul className="list-group">
                {this.state.list===true && this.state.ingredients.length>0 &&
                    this.state.ingredients.map((igs,index)=>(
                        <li className="list-group-item"  key={index}>
                            <span>Name: {igs.name}</span><br/>
                            <span>Nutrition: {igs.nutrition}</span><br/>
                            <span>Type: {igs.type}</span>
                            <button className="btn btn-outline-dark float-right"  onClick={()=>this.update(igs)}>Update</button>
                            <button className="btn btn-outline-dark float-right"  onClick={()=>this.deleteIngredient(igs.id)}>Delete</button>
                        </li>
                ))}
                </ul>

                {this.state.update===true && <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Enter the Ingredient</h4>
                        <div>
                            <label>Name</label>
                            <input className="form-control" defaultValue={this.state.updateIg.name}
                                   placeholder="Name" onChange={(e)=>this.setState({nameU:e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <label>Veg / Non veg?</label>
                            <select className="form-control" defaultValue={this.state.updateIg.type}
                                    onChange={(e)=>this.setState({typeU:e.target.value})}>
                                <option>Select</option>
                                <option>Vegetarian</option>
                                <option>Non-Vegetarian</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label>Nutrition</label>
                            <input className="form-control" defaultValue={this.state.updateIg.nutrition}
                                   placeholder="Nutrition" onChange={(e)=>this.setState({nutritionU:e.target.value})}/>
                        </div>
                        <br/>

                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateIg()}>Update</button>
                    </div>
                </div>}

            </div>
        )
    }


}

export default Ingredients;