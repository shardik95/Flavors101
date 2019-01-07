let _singleton=Symbol()

class ReviewService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ReviewService(_singleton);
        return this[_singleton]
    }

    createReview(review,userId,restName){
        return fetch("http://localhost:8080/api/review/"+userId+"/restaurant/"+restName,{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(review),
            credentials: 'include',
        }).then(review=>review.json())
    }

    getReviewsOfUser(userId){
        return fetch("http://localhost:8080/api/review/"+userId)
            .then(review=>review.json())
    }

    getReviewsOfRestaurant(id){
        return fetch("http://localhost:8080/api/review/restaurant/"+id)
            .then(review=>review.json())
    }

    deleteReview(id){
        return fetch("http://localhost:8080/api/review/"+id,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include',
        })
            .then(review=>review.json())
    }

    updateReview(review,userId,restName){
        return fetch("http://localhost:8080/api/review/"+userId+"/restaurant/"+restName,{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(review),
            credentials: 'include',
        }).then(review=>review.json())
    }

    updateReview(review){
        return fetch("http://localhost:8080/api/review",{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(review),
            credentials: 'include',
        }).then(review=>review.json())
    }

    getAllReviews(){
        return fetch("http://localhost:8080/api/review")
            .then(reviews=>reviews.json())

    }
}

export default ReviewService;