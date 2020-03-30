import React, { Fragment } from 'react'
import { Header, Card, Image, Button, Icon } from 'semantic-ui-react'

const PersonPhotos = ({ photos, deletePersonPhoto, setPersonMainPhoto, person }) => {
    let filteredPhotos;
    if (photos) {
        filteredPhotos = photos.filter(photo => {
            return photo.url !== person.ImageURL;
        });
    }
    return (
        <Fragment>
            <Header sub color='teal' content='Default Photos' />

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={person.ImageURL || '/assets/images/user.png'} />
                    <Button positive >Default Photo</Button>

                </Card>
                {photos && filteredPhotos.map(photo => (
                    <Card key={photo.id} >
                        <Image src={photo.url} />

                        <div className='ui two icons'>

                            <Icon link onClick={() => setPersonMainPhoto(photo, person)} name='user' size='large' />
                            <Icon link onClick={() => deletePersonPhoto(photo)} name='dont' size='large' />

                        </div>


                    </Card>

                ))}
            </Card.Group>
        </Fragment>
    )
}

export default PersonPhotos
