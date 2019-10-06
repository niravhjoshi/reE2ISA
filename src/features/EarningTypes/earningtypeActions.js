import { CREATE_EAR_TYPE,DELETE_EAR_TYPE,UPDATE_EAR_TYPE,FETCH_EAR_TYPE } from "./earningtypeConstants";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { fetchEarningTypeSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";


export const createEartype = (eartype) => {
    return async dispatch =>{
        try{
            dispatch({
                type: CREATE_EAR_TYPE,
                payload:{
                    eartype 
                    }
                })
                toastr.success('Sucess!','EarningType has been created');
        }
        catch(error){
            toastr.error('Opps !','Something went Wrong');
        }
    };
};

export const updateEartype = (eartype) =>{
    return async dispatch =>{
        try{
            dispatch({
                type: UPDATE_EAR_TYPE,
                payload:{
                    eartype 
                }
            })
            toastr.success('Upadate Sucess !','Earning Type has been Sucessfully updated');
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while update');
        }
    }  
};

export const deleteEartype = (eartypeid) =>{
    return async dispatch =>{
        try{
            dispatch({
                type: DELETE_EAR_TYPE,
                payload:{
                    eartypeid
                }
            })
            toastr.success('Sucess !','Earning Type Deleted sucessfully');
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while delete person');
        }
    }

}

export const loadEarningtype = () =>{
    return async dispatch =>{
        try{
            dispatch(asyncActionStart())
            const earningtypes = await fetchEarningTypeSampleData();
            dispatch({type:FETCH_EAR_TYPE,payload:{earningtypes}})
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(asyncActionError())
        }
    }
}