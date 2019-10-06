import {createReducer} from '../../app/common/utils/reducerUtils';
import { CREATE_EAR_TYPE,UPDATE_EAR_TYPE,DELETE_EAR_TYPE,FETCH_EAR_TYPE } from './earningtypeConstants';

const initState =[]

const createEartype = (state,payload) =>{
    return [...state,payload.eartype]
}

const updateEartype = (state,payload) =>{
    return [
        ...state.filter(eartype => eartype.id !== payload.eartype.id),payload.eartype
    ]
}


const deleteEartype = (state,payload) =>{
    return [
        ...state.filter(eartype => eartype.id !== payload.eartypeId)
    ]
}


const fetchEartype = (state,payload) =>{
        return payload.earningtypes
}


export default createReducer(initState,{
    [CREATE_EAR_TYPE]: createEartype,
    [UPDATE_EAR_TYPE]: updateEartype,
    [DELETE_EAR_TYPE]: deleteEartype,
    [FETCH_EAR_TYPE]: fetchEartype
} )