import React, { useState, useEffect, Fragment } from 'react'
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './PersonDropzoneinput';
import CropperInput from './PersonCropperInput';
import { connect } from 'react-redux';
import { setPersonMainPhoto, uploadPersonProfileImage, deletePersonPhoto } from '../personsActions'
import { firestoreConnect } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { compose } from 'redux';
import PersonPhotos from './PersonPhotos';


const query = ({ person }) => {
    return [
        {
            collection: 'persons',
            doc: person.id,
            subcollections: [{ collection: 'PersonProfilephotos' }],
            storeAs: 'PersonProfilephotos',
        }
    ]

}

const actions = {
    setPersonMainPhoto,
    uploadPersonProfileImage,
    deletePersonPhoto
}


const mapState = state => ({
    photos: state.firestore.ordered.PersonProfilephotos,
    loading: state.async.loading
})

const PersonPhotoPage = ({ setPersonMainPhoto, uploadPersonProfileImage, deletePersonPhoto, photos, person, loading }) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [cropResult, setCropResult] = useState('');

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
            URL.revokeObjectURL(cropResult);
        }
    }, [files, cropResult]);

    const handlePersonuploadImage = async () => {
        try {
            await uploadPersonProfileImage(person, image, files[0].name);
            handlePersoncancelCrop();
            toastr.success('Sucess', 'Photo has been uploaded');
        }
        catch (error) {
            console.log(error);
            toastr.error("Error While Uploading Image", error);
        }
    }

    const handlePersoncancelCrop = () => {
        setFiles([]);
        setImage(null);
        setCropResult('');
    }

    const handlePersonDeletePhoto = async photo => {
        try {
            await deletePersonPhoto(photo, person);
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };

    const handlePersonSetMainPhoto = async (photo, person) => {
        try {
            await setPersonMainPhoto(photo, person);
        } catch (error) {
            toastr.error('Oops Set Main Photo Error', error.message);
        }
    };


    return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <DropzoneInput setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 &&
                        <CropperInput setImage={setImage} imagePreview={files[0].preview} />}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 && (
                        <Fragment>
                            <div className='img-preview' style=
                                {{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }}
                            />
                            <Button.Group>
                                <Button
                                    loading={loading}
                                    onClick={handlePersonuploadImage}

                                    style={{ width: '100px' }}
                                    positive
                                    icon='check'
                                />
                                <Button
                                    disabled={loading}
                                    onClick={handlePersoncancelCrop}
                                    style={{ width: '100px' }}
                                    icon='close'
                                />
                            </Button.Group>
                            <i className="tiny icons">
                                <i className="big circle outline icon"></i>
                                <i className="user icon"></i>
                            </i>
                        </Fragment>
                    )}
                </Grid.Column>
            </Grid>

            <Divider />
            <PersonPhotos person={person}
                photos={photos}
                deletePersonPhoto={handlePersonDeletePhoto}
                setPersonMainPhoto={handlePersonSetMainPhoto}
            />
        </Segment >
    );
}

export default compose(connect(mapState, actions), firestoreConnect(person => query(person)))(PersonPhotoPage);
