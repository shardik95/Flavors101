let _singleton=Symbol()

class RecipeService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new RecipeService(_singleton);
        return this[_singleton]
    }

    createRecipe(r,id){
        return fetch("http://localhost:8080/api/recipie/"+id,{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(r),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    updateRecipe(r){
        console.log(r)
        return fetch("http://localhost:8080/api/recipe/update",{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(r),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    getRecipeForChef(id) {
        return fetch("http://localhost:8080/api/recipie/chef/"+id)
            .then(igs => igs.json())
    }

    deleteRecipe(id){
        return fetch("http://localhost:8080/api/recipe/"+id,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include',
        })
            .then(igs => igs.json())
    }

}

export default RecipeService;