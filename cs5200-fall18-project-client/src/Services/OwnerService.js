let _singleton=Symbol()

class OwnerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new OwnerService(_singleton);
        return this[_singleton]
    }

    createRestaurant(restaurant,ownerId){
        return fetch("http://localhost:8080/api/owner/"+ownerId+"/restaurant",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(restaurant),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    createRestaurantadmin(rest){
        return fetch("http://localhost:8080/api/owner/restaurant",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(rest),
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    getAllRestaurants(id){
        return fetch("http://localhost:8080/api/owner/restaurant/"+id,{
            credentials: 'include',
        }).then(restaurant=>restaurant.json())
    }

    findAllOwners(){
        return fetch("http://localhost:8080/api/owners")
            .then(res => res.json())
    }

    createOwner(owner){
        return fetch("http://localhost:8080/api/owner/signup",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(owner),
            credentials: 'include',
        }).then(user=>user.json())
    }

    updateRestaurant(rest){
        return fetch("http://localhost:8080/api/restaurant/owner",{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(rest),
            credentials: 'include',
        }).then(user=>user.json())
    }

}

export default OwnerService;
