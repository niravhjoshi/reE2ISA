import {  UPDATE_PERSON, DELETE_PERSON } from "./personsConstants";

import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
// import { fetchPersonSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import {createNewPerson} from '../../app/common/utils/helpers'



export const createPerson = person => {
    return async (dispatch,getState,{getFirestore,getFirebase}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const photoURL= getState().firebase.profile.photoURL;
        const newperson = createNewPerson(user,photoURL,person)
        try{
            let createdPerson = await firestore.add('persons',newperson);
            toastr.success('Sucess!','Person has been created');
            return createdPerson;
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
            // const persons = await fetchPersonSampleData();
            // dispatch({type:FETCH_PERSON,payload:{persons}})
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(asyncActionError())
        }
    }
}
