import cuid from 'cuid';
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";



//Photo upload method to FireStore Object Storage
export const uploadProfileImage =(file,fileName)  =>
    async (dispatch,getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const imageName = cuid();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/UserProfile_image`;
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
            let userDoc = await firestore.get(`users/${user.uid}`);
            //check if user has photo if not update profile
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                });
                await firebase.updateProfile({
                    photoURL:downloadURL
                })
            }
            // add the image to firestore
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'Profilephotos'}]
            },{
                name:imageName,
                url:downloadURL
            })
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error)
            dispatch(asyncActionError())
        }
    }

    export const deletePhoto = (photo) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/UserProfile_image/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'Profilephotos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error)
            throw new Error('Problem deleting the photo')
        }
    }

    export const setMainPhoto = (photo) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url
            })
        } catch (error) {
            console.log(error);
            throw new Error('Problem setting main photo')
        }
    }