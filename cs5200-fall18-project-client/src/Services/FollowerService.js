let _singleton=Symbol()

class FollowerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FollowerService(_singleton);
        return this[_singleton]
    }

    createFollower(followerId,user){
        return fetch("http://localhost:8080/api/user/follower/"+followerId,{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(user),
            credentials: 'include',
        }).then(user=>user.json())
    }

    getFollower(userId){

        return fetch("http://localhost:8080/api/user/"+userId+"/follower")
            .then(user=>user.json())
    }

    deleteFollower(followerId,user){
        return fetch("http://localhost:8080/api/customer/follower/"+followerId,{
            method:'Delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(user),
            credentials: 'include',
        }).then(user=>user.json())
    }

}

export default FollowerService