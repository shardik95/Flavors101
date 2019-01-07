let _singleton=Symbol()

class RestaurantService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new RestaurantService(_singleton);
        return this[_singleton]
    }

    getAllRestaurants(){
        return fetch("http://localhost:8080/api/restaurant")
            .then(restaurants=>restaurants.json())
    }

    reserve(restId,userId){
        return fetch("http://localhost:8080/api/user/"+userId+"/restaurant/"+restId,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Credentials':true,
                    'Access-Control-Allow-Origin':true

                },
                credentials: 'include',

            }
        )
            .then(user=>user.json())
    }

    cancelReservation(restId,userId){
        return fetch("http://localhost:8080/api/user/"+userId+"/restaurant/"+restId,{
                method:'delete',
                headers:{
                    'content-type':'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Credentials':true,
                    'Access-Control-Allow-Origin':true

                },
                credentials: 'include',

            }
        )
            .then(user=>user.json())
    }

    getReservations(id){
        return fetch("http://localhost:8080/api/restaurant/"+id+"/reservation")
            .then(restaurants=>restaurants.json())
    }

    getRestaurantById(id){
        return fetch("http://localhost:8080/api/restaurant/"+id)
            .then(restaurant=>restaurant.json())
    }

    deleteRestaurant(id){
        return fetch("http://localhost:8080/api/restaurant/"+id,{
                method:'delete',
                headers:{
                    'content-type':'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Credentials':true,
                    'Access-Control-Allow-Origin':true

                },
                credentials: 'include',

            }
        )
    }

    updateRest(rest){
        return fetch("http://localhost:8080/api/restaurant/",{
                method:'put',
                headers:{
                    'content-type':'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Credentials':true,
                    'Access-Control-Allow-Origin':true

                },
                body:JSON.stringify(rest),
                credentials: 'include',

            }
        )
            .then(user=>user.json())
    }

}

export default RestaurantService;