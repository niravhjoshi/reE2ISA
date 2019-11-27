
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import {createNewPerson} from '../../app/common/utils/helpers'
import cuid from "cuid";



export const createPerson = person => {
    return async (dispatch,getState,{getFirestore,getFirebase}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const photoURL= getState().firebase.profile.photoURL;
        const newperson = createNewPerson(user,photoURL,person)
        try{
            let createdPerson = await firestore.add('persons',newperson);
            toastr.success('Sucess!','Person has been created');
            return createdPerson;
        }
        catch(error){
            toastr.error('Opps !','Something went Wrong');
        }
    };
};


export const updatePerson = (person,file,filename) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const imageName = cuid();
        const firestore = getFirestore();
        //const user = firebase.auth().currentUser;
     

        try{
            // dispatch(asyncActionStart())
            // //uploda file to firebase storage
            // let uploadFile = await firebase.uploadFile(path,file,null,options)
            // //get URL of image
            // let downloadURL = await uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
            // //get personDoc with UID 
            // let personDoc = await firestore.get(`persons/${person.createdUID}`);
            // //Check if person has imageURL in his document or not
            // if(!personDoc.data().ImageURL){
            //     await firestore.update(`persons/${person.id}`, person)
            //         //ImageURL:downloadURL
            //     }
            await firestore.update(`persons/${person.id}`, person)
            toastr.success('Upadate Sucess !','Person has been Sucessfully updated');
                
            }

        catch(error){
            toastr.error('Opps !','Something went wrong while update');
        }
    }
    
}

export const deletePerson = (personId) =>{
    return async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firestore = getFirestore();
        //const firebase = getFirebase();
        try{
            await firestore.delete(`persons/${personId}`)
            toastr.success('Sucess !','Person Deleted sucessfully');
            }
        
        catch(error){
            toastr.error('Opps !','Something went wrong while delete person');
        }
    }

}

export const loadPersons = () =>{
    return async dispatch =>{
        try{
            dispatch(asyncActionStart())
            // const persons = await fetchPersonSampleData();
            // dispatch({type:FETCH_PERSON,payload:{persons}})
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(asyncActionError())
        }
    }
}
/*
//Upload person new image 
export const uploadPersonImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/Person_images`;
        const options = {
            name: imageName
        };
        try {
            dispatch(asyncActionStart())
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            // get url of the image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc 
            let PersonDoc = await firestore.get(`persons/${person.uid}`);
            //If person does not have image URL then upload image will be added as default image
            if (!PersonDoc.data().ImageURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });

//Make that image as main image

//Delete Image which person does not want to keep it

*/