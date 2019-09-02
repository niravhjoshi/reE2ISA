import { CREATE_PERSON, UPDATE_PERSON, DELETE_PERSON, FETCH_PERSON } from "./personsConstants";

import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

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

export const loadPersons = () =>{
    return async dispatch =>{
        try{
            dispatch(asyncActionStart())
            const persons = await fetchSampleData();
            dispatch({type:FETCH_PERSON,payload:{persons}})
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(asyncActionError())
        }
    }
}