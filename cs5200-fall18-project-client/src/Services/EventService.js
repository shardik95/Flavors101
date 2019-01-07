let _singleton=Symbol()

class EventService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EventService(_singleton);
        return this[_singleton]
    }

    createEvent(managerId,event,restId){
        return fetch("http://localhost:8080/api/manager/"+managerId+"/restaurant/"+restId+"/event",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(event),
            credentials: 'include',
        }).then(event=>event.json())
    }

    getEvents(id){
        return fetch("http://localhost:8080//api/manager/"+id+"/event")
            .then(event=>event.json())
    }

    getAllEvents(){
        return fetch("http://localhost:8080/api/event")
            .then(event=>event.json())
    }

    attendEvent(userId,eventId){
        return fetch("http://localhost:8080/api/customer/"+userId+"/event/"+eventId,{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include',
        })
            .then(event=>event.json())
    }

    cancelEvent(userId,eventId){
        return fetch("http://localhost:8080/api/customer/"+userId+"/event/"+eventId,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include',
        })

    }

    deleteEvent(id){
        return fetch("http://localhost:8080/api/event/"+id,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include',
        })
    }

    updateEvent(event,id){
        return fetch("http://localhost:8080/api/event/manager/"+id,{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(event),
            credentials: 'include',
        }).then(event=>event.json())
    }
}

export default EventService;