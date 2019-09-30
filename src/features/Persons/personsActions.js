import { CREATE_PERSON, UPDATE_PERSON, DELETE_PERSON, FETCH_PERSON } from "./personsConstants";

import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";

export const createPerson = (person) => {
    return async dispatch =>{
        try{
            dispatch({
                type: CREATE_PERSON,
                payload:{
                        person 
                    }
                })
                toastr.success('Sucess!','Person has been created');
        }
        catch(error){
            toastr.error('Opps !','Something went Wrong');
        }
    };
};


export const updatePerson = (person) =>{
    return async dispatch =>{
        try{
            dispatch({
                type: UPDATE_PERSON,
                payload:{
                    person 
                }
            })
            toastr.success('Upadate Sucess !','Person has been Sucessfully updated');
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while update');
        }
    }
    
}

export const deletePerson = (personId) =>{
    return async dispatch =>{
        try{
            dispatch({
                type: DELETE_PERSON,
                payload:{
                    personId
                }
            })
            toastr.success('Sucess !','Person Deleted sucessfully');
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while delete person');
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