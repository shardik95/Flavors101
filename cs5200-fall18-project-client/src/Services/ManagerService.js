let _singleton=Symbol()

class ManagerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ManagerService(_singleton);
        return this[_singleton]
    }

    getAllUnhiredManagers(){
        return fetch("http://localhost:8080/api/managers/unhired")
            .then(managers=>managers.json())
    }

    hireManager(ownerId,managerId,rest){
        return fetch("http://localhost:8080/api/owner/"+ownerId+"/manager/"+managerId+"/hire/"+rest,{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            }
        }).then(managers=>managers.json())
    }

    getAllHiredManagers(ownerId){
        return fetch("http://localhost:8080/api/owner/"+ownerId+"/manager/hire")
            .then(managers=>managers.json())
    }

    getManagerById(id){
        return fetch("http://localhost:8080/api/manager/"+id+"/restaurant")
            .then(manager=>manager.json())
    }

    getManager(id){
        return fetch("http://localhost:8080/api/manager/"+id)
            .then(manager=>manager.json())
    }

    findAllManagers(){
        return fetch("http://localhost:8080/api/managers")
            .then(res => res.json())
    }

    createManager(manager){
        return fetch("http://localhost:8080/api/manager/signup",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(manager),
            credentials: 'include',
        }).then(user=>user.json())
    }


}

export default ManagerService;