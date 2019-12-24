import { toastr } from "react-redux-toastr";
import {createNewEarningType} from '../../app/common/utils/helpers'



export const createEarningType = EarningType => {
    return async (dispatch,getState,{getFirestore,getFirebase}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const newEarningType = createNewEarningType(user,EarningType)
        try{
            let createdEarningType = await firestore.add('earningTypes',newEarningType);
            toastr.success('Sucess!','Earning Type has been created');
            return createdEarningType;
        }
        catch(error){
            toastr.error('Opps !','Something went Wrong Check in Earning Type Entry');
        }
    };
};


export const updateEarningType = (earningType) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
       

        try{
            await firestore.update(`earningTypes/${earningType.id}`, earningType)
            toastr.success('Upadate Sucess !','Earning Type Update Fine');
            }

        catch(error){
            toastr.error('Opps !','Something went wrong while update Earning Entry');
        }
    }
    
}

export const deleteEarningType = (earningTypeId) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
        // const firebase = getFirebase();
        // const user = firebase.auth().currentUser;
        const message = earningTypeId
        ? 'Are you sure you want to delete the Person?'
        : 'This , are you sure?';
        try{
            toastr.confirm(message, {
                onOk: async() => 
                             await firestore.delete(`earningTypes/${earningTypeId}`,
                             {earningTypeId:earningTypeId})
                             
            })
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while delete Earning Type Entry');
        }
    }

}




// export const createEartype = (eartype) => {
//     return async dispatch =>{
//         try{
//             dispatch({
//                 type: CREATE_EAR_TYPE,
//                 payload:{
//                     eartype 
//                     }
//                 })
//                 toastr.success('Sucess!','EarningType has been created');
//         }
//         catch(error){
//             toastr.error('Opps !','Something went Wrong');
//         }
//     };
// };

// export const updateEartype = (eartype) =>{
//     return async dispatch =>{
//         try{
//             dispatch({
//                 type: UPDATE_EAR_TYPE,
//                 payload:{
//                     eartype 
//                 }
//             })
//             toastr.success('Upadate Sucess !','Earning Type has been Sucessfully updated');
//         }
//         catch(error){
//             toastr.error('Opps !','Something went wrong while update');
//         }
//     }  
// };

// export const deleteEartype = (eartypeid) =>{
//     return async dispatch =>{
//         try{
//             dispatch({
//                 type: DELETE_EAR_TYPE,
//                 payload:{
//                     eartypeid
//                 }
//             })
//             toastr.success('Sucess !','Earning Type Deleted sucessfully');
//         }
//         catch(error){
//             toastr.error('Opps !','Something went wrong while delete person');
//         }
//     }

// }

// export const loadEarningtype = () =>{
//     return async dispatch =>{
//         try{
//             dispatch(asyncActionStart())
//             const earningtypes = await fetchEarningTypeSampleData();
//             dispatch({type:FETCH_EAR_TYPE,payload:{earningtypes}})
//             dispatch(asyncActionFinish())
//         }
//         catch(error){
//             console.log(error);
//             dispatch(asyncActionError())
//         }
//     }
// }