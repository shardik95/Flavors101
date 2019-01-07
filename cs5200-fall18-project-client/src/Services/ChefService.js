let _singleton=Symbol()

class ChefService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ChefService(_singleton);
        return this[_singleton]
    }

    getAllUnhiredChefs(){
        return fetch("http://localhost:8080/api/chef/unhired")
            .then(managers=>managers.json())
    }

    hireChef(ownerId,chefId,rest){
        return fetch("http://localhost:8080/api/owner/"+ownerId+"/chef/"+chefId+"/hire/"+rest,{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            }
        }).then(managers=>managers.json())
    }

    getAllHiredChefs(ownerId){
        return fetch("http://localhost:8080/api/owner/"+ownerId+"/chef/hire")
            .then(managers=>managers.json())
    }

    getChefRestaurantById(id){
        return fetch("http://localhost:8080/api/chef/"+id+"/restaurant")
            .then(manager=>manager.json())
    }

    getChef(id){
        return fetch("http://localhost:8080/api/chef/"+id)
            .then(manager=>manager.json())
    }

    findAllChefs(){
        return fetch("http://localhost:8080/api/chefs")
            .then(res => res.json())
    }

    createChef(chef){
        return fetch("http://localhost:8080/api/chef/signup",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(chef),
            credentials: 'include',
        }).then(user=>user.json())
    }

}

export default ChefService