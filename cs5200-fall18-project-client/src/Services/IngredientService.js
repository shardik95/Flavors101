let _singleton=Symbol()

class IngredientService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new IngredientService(_singleton);
        return this[_singleton]
    }

    createIngredient(ingredient){
        return fetch("http://localhost:8080/api/ingredient",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(ingredient),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    updateIngredient(ingredient){
        return fetch("http://localhost:8080/api/ingredient/update",{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(ingredient),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    getAllIngredients() {
        return fetch("http://localhost:8080/api/ingredient")
            .then(igs => igs.json())
    }

    deleteIngredient(id){
        return fetch("http://localhost:8080/api/ingredient/"+id,{
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

export default IngredientService;