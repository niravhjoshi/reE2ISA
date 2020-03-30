import {createReducer} from '../../app/common/utils/reducerUtils';
import { CREATE_EAR_TYPE,UPDATE_EAR_TYPE,DELETE_EAR_TYPE,FETCH_PERSONDD_TYPE,FETCH_EAR_TYPE } from './earningtypeConstants';

const initState =[]

const fetchEarningTypes = (state,payload) =>{
    return payload.EarningTypes
}


const createEartype = (state,payload) =>{
    return [...state,payload.eartype]
}

const updateEartype = (state,payload) =>{
    return [
        ...state.filter(earningType => earningType.id !== payload.earningType.id),payload.earningType
    ]
}


const deleteEartype = (state,payload) =>{
    return [
        ...state.filter(earningtypes => earningtypes.id !== payload.earningTypeId),
    ]
}

const fetchPersonDD = (state,payload) =>{
    return payload.personsDD
}

export default createReducer(initState,{
    [FETCH_EAR_TYPE] : fetchEarningTypes,
    [CREATE_EAR_TYPE]: createEartype,
    [UPDATE_EAR_TYPE]: updateEartype,
    [DELETE_EAR_TYPE]: deleteEartype,
    [FETCH_PERSONDD_TYPE] : fetchPersonDD
} )