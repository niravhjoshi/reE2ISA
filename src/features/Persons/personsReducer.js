
import {createReducer} from '../../app/common/utils/reducerUtils';
import { CREATE_PERSON, UPDATE_PERSON, DELETE_PERSON } from './personsConstants';

const initState =[]

const createPerson = (state,payload) =>{
    return [...state,payload.person]
}

const updatePerson = (state,payload) =>{
    return [
        ...state.filter(person => person.id !== payload.person.id),payload.person
    ]
}


const deletePerson = (state,payload) =>{
    return [
        ...state.filter(person => person.id !== payload.personId)
    ]
}


export default createReducer(initState,{
    [CREATE_PERSON]: createPerson,
    [UPDATE_PERSON]: updatePerson ,
    [DELETE_PERSON]: deletePerson
    
} )