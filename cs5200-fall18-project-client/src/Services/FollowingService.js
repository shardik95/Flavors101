let _singleton=Symbol()

class FollowingService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FollowingService(_singleton);
        return this[_singleton]
    }

    createFollowing(meFollowingId,user){
        return fetch("http://localhost:8080/api/user/following/"+meFollowingId,{
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

    isFollowing(meFollowingId,user){
        return fetch("http://localhost:8080/api/customer/following/"+meFollowingId,{
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

    getFollowing(userId){

        return fetch("http://localhost:8080/api/user/"+userId+"/following")
            .then(user=>user.json())
    }

    deleteFollowing(meFollowingId,user){
        return fetch("http://localhost:8080/api/customer/following/"+meFollowingId,{
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

export default FollowingService