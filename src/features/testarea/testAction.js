import {INCREMENT_CNTR,DECREMENT_CNTR} from './testConstants';
import { asyncActionFinish } from '../async/asyncActions';
import { ASYNC_ACTION_START } from '../async/asyncConstants';


export const incre_cntr = () =>{
   return  {   
    type: INCREMENT_CNTR
    }
}

export const decre_cntr = () =>{
    return{
        type: DECREMENT_CNTR
    }
}

const delay= (ms) => {
    return new Promise(resolve => setTimeout(resolve,ms))
}

export const incrementAsync = (name) =>{
    return async dispatch =>{
        dispatch({type: ASYNC_ACTION_START,payload: name})
        await delay(1000)
        dispatch(incre_cntr())
        dispatch(asyncActionFinish())
    }
}

export const decrementAsync = (name) =>{
    return async dispatch =>{
        dispatch({type: ASYNC_ACTION_START,payload: name})
        await delay(1000)
        dispatch(decre_cntr())
        dispatch(asyncActionFinish())
    }
}