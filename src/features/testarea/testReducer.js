import {INCREMENT_CNTR,DECREMENT_CNTR} from './testConstants';
import { createReducer } from '../../app/common/utils/reducerUtils';

const initialState ={
    data : 42
}

const increment_cntr = (state)=>{
    return {...state,data:state.data+1};
    
}

const decrement_cntr = (state)=>{
    return {...state,data:state.data-1};
    
}

export default createReducer(initialState,{
    [INCREMENT_CNTR]: increment_cntr,
    [DECREMENT_CNTR]: decrement_cntr

})


// const testReducer = (state = initialState,action) =>{
//     switch(action.type){
//         case INCREMENT_CNTR:
//             return{...state,data: state.data+1}

//         case DECREMENT_CNTR:
//             return{...state,data: state.data-1}
//         default:
//             return state;
//     }
  

// }