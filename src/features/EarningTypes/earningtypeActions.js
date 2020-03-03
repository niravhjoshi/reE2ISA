import { toastr } from "react-redux-toastr";
import {createNewEarningType} from '../../app/common/utils/helpers'
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import firebase from '../../app/config/firebase';
import {FETCH_PERSONDD_TYPE,FETCH_EAR_TYPE,DELETE_EAR_TYPE} from './earningtypeConstants';
        

//Fetch person for state and use this state into other featers for getting person name in drop down 
export const getPersonForDD =  async (dispatch,getState) => {
    // let today = new Date();
    const firestore = firebase.firestore();
    const curreUser = firebase.auth().currentUser;
    console.log(curreUser.uid)
    const personsref = firestore.collection('persons').where("createdUID", "==", curreUser.uid);
    console.log(personsref)

    try{
        dispatch(asyncActionStart);
        let querySnap = await personsref.get()
        let personsDD=[]
        for(let i=0;i<querySnap.docs.length;i++){
            let per = {...querySnap.docs[i].data(),id:querySnap.docs[i].id}
            personsDD.push(per)
        }
        console.log(personsDD)
        dispatch({type : FETCH_PERSONDD_TYPE, payload : {personsDD}})
        dispatch(asyncActionFinish)
        //return querySnap;
    }
    

    catch(error){
        console.log(error)
        dispatch(asyncActionError)
    }

};


export const fetchEarningTypes = lastEarType => async (dispatch,getState) =>{
    const firestore = firebase.firestore();
    const curreUser = firebase.auth().currentUser;
    const userId = getState().firebase['auth']['uid']
    console.log(curreUser.uid)
    const eartyperef = firestore.collection('earningTypes').where("createdUID", "==", userId).orderBy('created', 'desc').limit(5)
    console.log(eartyperef)
    try{
        dispatch(asyncActionStart());
        let startAfter = lastEarType && await firestore.collection('earningTypes').doc(lastEarType.id).get();
        //.where("createdUID", "==", userId).orderBy('created', 'desc')
        console.log(startAfter)
        let query;

        lastEarType ? (query = eartyperef.startAfter(startAfter).limit(5)) : (query = eartyperef)
        let querySnap = await query.get()
        //If no person find then we will return querysnap as zero and asyncaction finish
        if (querySnap.docs.length === 0) {
            dispatch(asyncActionFinish());
            return querySnap;
          }

        let earTypes=[]

        for(let i=0;i<querySnap.docs.length;i++){
            let eartype = {...querySnap.docs[i].data(),id:querySnap.docs[i].id}
            earTypes.push(eartype)
        }
        // console.log(persons)
        dispatch({type : FETCH_EAR_TYPE, payload : {earTypes}})
        dispatch(asyncActionFinish())
        return querySnap;
    }
    

    catch(error){
        console.log(error)
        dispatch(asyncActionError())
    }

}


// export const getPersons = (userUid) =>
//     async(dispatch,getState) => {
//         dispatch(asyncActionStart())
//         const firestore = firebase.firestore();
//         // let date = new Date(Date.now());
//         let personref = firestore.collection('persons');
//         let query;
//         query= personref.where('createdUID','==',userUid);
//                 try{
//                     let querysnap = await query.get()
//                     console.log(querysnap);
//                     dispatch(asyncActionFinish())
//                 }
//                 catch(error){
//                     console.log(error)
//                     dispatch(asyncActionError())
//                 }

//     }

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
        ? 'Are you sure you want to delete the Earning Types?'
        : 'This , are you sure?';
        dispatch(asyncActionStart);
        try{
            toastr.confirm(message, {
                onOk: async() => {
                             await firestore.delete(`earningTypes/${earningTypeId}`)
                             dispatch({type : DELETE_EAR_TYPE, payload : {earningTypeId}})
                             dispatch(asyncActionFinish);
                            }
                             
                    

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