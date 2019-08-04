import { CREATE_PERSON, UPDATE_PERSON, DELETE_PERSON } from "./personsConstants";

export const createPerson = (person) => {
    return{
        type: CREATE_PERSON,
        payload:{
            person 
            //payload.person
        }
    }
}

export const updatePerson = (person) =>{
    return{
        type: UPDATE_PERSON,
        payload:{
            person 
            //payload.person
        }
    }
}

export const deletePerson = (personId) =>{
    return{
        type: DELETE_PERSON,
        payload:{
            personId
            //payload.personID
        }
    }
}