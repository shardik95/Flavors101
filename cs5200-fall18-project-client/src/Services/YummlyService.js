let _singleton=Symbol()

class YummlyService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new YummlyService(_singleton);
        return this[_singleton]
    }

    searchRecipes(searchParameters){
        return fetch("http://localhost:8080/api/yummlyData/"+searchParameters)
            .then(res => res.json());
    }

    getYummlyRecipe(recipeId){
        return fetch("http://localhost:8080/api/recipe/"+recipeId)
            .then(res => res.json());
    }
}

export default YummlyService;