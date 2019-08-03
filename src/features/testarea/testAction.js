import {INCREMENT_CNTR,DECREMENT_CNTR} from './testConstants';


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