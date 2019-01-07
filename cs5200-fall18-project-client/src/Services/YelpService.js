let _singleton=Symbol()

class YelpService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new YelpService(_singleton);
        return this[_singleton]
    }

    getYelpRestaurants(term,location){

        return fetch("http://localhost:8080/api/yelpdata/"+term+"/"+location)
            .then(data=>data.json())

    }

    getRestaurant(id){

        return fetch("http://localhost:8080/api/yelpdata/businesses/"+id)
            .then(data=>data.json())

    }

}

export default YelpService;