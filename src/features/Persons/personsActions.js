import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import {createNewPerson} from '../../app/common/utils/helpers'
import cuid from "cuid";
import firebase from '../../app/config/firebase';
import { FETCH_PERSON,DELETE_PERSON } from "./personsConstants";
 
// Direct firebase query to get data for persons
export const getPersonDashboard = lastPerson =>async (dispatch, getState) => { 
        const firestore = firebase.firestore();
        const userId = getState().firebase['auth']['uid']
        const personsref = firestore.collection('persons').where("createdUID", "==", userId).orderBy('created', 'desc').limit(2)

        try{
            dispatch(asyncActionStart());
            let startAfter = lastPerson && await firestore.collection('persons').doc(lastPerson.id).get();
            //.where("createdUID", "==", userId).orderBy('created', 'desc')
            console.log(startAfter)
            let query;

            lastPerson ? (query = personsref.startAfter(startAfter).limit(2)) : (query = personsref)
            let querySnap = await query.get()
            //If no person find then we will return querysnap as zero and asyncaction finish
            if (querySnap.docs.length === 0) {
                dispatch(asyncActionFinish());
                return querySnap;
              }

            let persons=[]

            for(let i=0;i<querySnap.docs.length;i++){
                let per = {...querySnap.docs[i].data(),id:querySnap.docs[i].id}
                persons.push(per)
            }
            // console.log(persons)
            dispatch({type : FETCH_PERSON, payload : {persons}})
            dispatch(asyncActionFinish())
            return querySnap;
        }
        
    
        catch(error){
            console.log(error)
            dispatch(asyncActionError())
        }
    
}



export const createPerson = person => {
    return async (dispatch,getState,{getFirestore,getFirebase}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const photoURL= getState().firebase.profile.photoURL;
        const newperson = createNewPerson(user,photoURL,person)
        try {

            let createdPerson = await firestore.add('persons', newperson);
            toastr.success('Sucess!', 'Person has been created');
            return createdPerson;
            
        }
        catch(error){
            toastr.error('Opps !','Something went Wrong');
        }
    };
};


export const updatePerson = (person,file,filename) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
       

        try{
            await firestore.update(`persons/${person.id}`, person)
            toastr.success('Upadate Sucess !','I am updatePersonPerson has been Sucessfully updated');
            }

        catch(error){
            toastr.error('Opps !','Something went wrong while update');
        }
    }
    
}

export const deletePerson = (personId) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
        // const firebase = getFirebase();
        // const user = firebase.auth().currentUser;
        const message = personId
        ? 'Are you sure you want to delete the Person?'
        : 'This , are you sure?';
        dispatch(asyncActionStart);
        try{
                toastr.confirm(message, {
                onOk: async() =>{ 
                             await firestore.delete(`persons/${personId}`,{personId:personId})
                             dispatch({type : DELETE_PERSON, payload : {personId}})
                             dispatch(asyncActionFinish);
            
                            }
                             
                             
                                              
                             
            })
            
        }
        catch(error){
            toastr.error('Opps !','Something went wrong while delete person');
        }
    }

}

//Person Photo upload method to FireStore Object Storage
export const uploadPersonProfileImage =(person,file,fileName)  =>
    async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const imageName = cuid();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/PersonProfile_image/${person.id}`;
        const options={
            name :imageName
        }
        try{
            dispatch(asyncActionStart())
            //uploda file to firebase storage
            let uploadFile = await firebase.uploadFile(path,file,null,options)
            //get URL of image
            let downloadURL = await uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
            //get userdoc
            let PersonDoc = await firestore.get(`persons/${person.id}`);
            //check if person has photo if not update profile
            if(!PersonDoc.data().ImageURL){
               
                await firestore.update(`persons/${person.id}`, {ImageURL:downloadURL})
                toastr.success('Upadate Sucess !','Person has been Sucessfully updated');

                await firestore.update(`persons/${person.id}`, {ImageURL:downloadURL})
                toastr.success('Upadate Sucess !','Person has been Sucessfully updated');               
               
            }
            
            // add the image to firestore
            await firestore.add({
                collection: 'Persons_ProfilePhotos',
                doc: person.id,
                subcollections: [{collection: 'PersonProfilephotos'}]
            },{
                name:imageName,
                url:downloadURL,
                CreatorName:user.displayName,
                CreateByUID:user.uid
            })
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error)
            dispatch(asyncActionError())
        }
    }

    export const deletePersonPhoto = (photo,person) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/PersonProfile_image/${person.id}/${photo.name}`);
            await firestore.delete({
                collection: 'Persons_ProfilePhotos',
                doc: person.id,
                subcollections: [{collection: 'PersonProfilephotos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error)
            throw new Error('Problem deleting the photo')
        }
    }

    export const setPersonMainPhoto = (photo,person) => 
    async (dispatch, getState, {getFirebase,getFirestore}) => {
        
        const firestore = getFirestore();
        try { 
            await firestore.update(`persons/${person.id}`, {ImageURL:photo.url})
            toastr.success('Upadate Sucess !','Person profileImage updated');
        } 
        
        catch (error) {
            console.log(error);
            throw new Error('Problem setting main photo')
        }
    }