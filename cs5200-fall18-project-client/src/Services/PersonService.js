let _singleton=Symbol()

class PersonService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new PersonService(_singleton);
        return this[_singleton]
    }

    createUser(user){


        if(user.role==='Customer'){
           return this.createCustomer(user)
        }
        else if(user.role==='Chef'){
            return this.createChef(user)
        }
        else if(user.role==='Manager'){
            return this.createManager(user)
        }
        else{
            return this.createOwner(user)
        }

    }

    createOwner(user){
        return fetch("http://localhost:8080/api/owner/signup",{
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

    createChef(user){
        return fetch("http://localhost:8080/api/chef/signup",{
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

    createManager(user){
        return fetch("http://localhost:8080/api/manager/signup",{
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

    createCustomer(user){
        return fetch("http://localhost:8080/api/customer/signup",{
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

    getSession(){
        return fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
    }

    logout(){
        return fetch("http://localhost:8080/api/logout",{
            credentials: 'include'
        })
    }

    loginUser(user){
        return fetch("http://localhost:8080/api/login",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true

            },
            body:JSON.stringify(user),
            credentials: 'include',

        }).then((response)=>response.json())
    }

    searchCustomer(query){

        return fetch("http://localhost:8080/api/customer/search/q="+query)
                .then(response=>response.json())

    }

    searchChef(query){
        return fetch("http://localhost:8080/api/chef/search/q="+query)
            .then(response=>response.json())

    }

    findUserById(id){
            return fetch("http://localhost:8080/api/user/"+id)
                .then(response =>(
                    response.json()
                ))
    }

    updateUser(updateUser){
        return fetch("http://localhost:8080/api/user/update",{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true

            },
            body:JSON.stringify(updateUser),
            credentials: 'include',

        }).then((response)=>response.json())
    }

    findAllCustomers(){
        return fetch("http://localhost:8080/api/customers")
            .then(res => res.json())
    }

    deleteUser(id){
        return fetch("http://localhost:8080/api/user/delete/"+id, {
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true

            },
            credentials: 'include',

        })
            .then(res=>res.json())
    }

    update(user){
        if(user.role==='Customer'){
            return this.updateCustomer(user)
        }
        else if(user.role==='Chef'){
            return this.updateChef(user)
        }
        else if(user.role==='Manager'){
            return this.updateManager(user)
        }
        else{
            return this.updateOwner(user)
        }
    }

    updateOwner(user){
        return fetch("http://localhost:8080/api/owner/signup",{
            method:'put',
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

    updateChef(user){
        return fetch("http://localhost:8080/api/chef/signup",{
            method:'put',
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

    updateManager(user){
        return fetch("http://localhost:8080/api/manager/signup",{
            method:'put',
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

    updateCustomer(user){
        return fetch("http://localhost:8080/api/customer/signup",{
            method:'put',
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

export default PersonService;