import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


const personImageStyle = {
    filter: 'brightness(30%)'

};
const personImageTextStyle =
{
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const PersonsDetailedHeader = ({
    person,
    deletePerson,

}) => {


    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={person.ImageURL} size="large" style={personImageStyle} />

                <Segment basic style={personImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={person.FullName}
                                    style={{ color: 'white' }}
                                />
                                <p>BirthDate:  <strong>{person.BirthDate && format(person.BirthDate.toDate(), 'EEEE do LLLL')}</strong></p>
                                <p>
                                    Sex: <strong>{person.Sex}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                {/* <Button color="red" onClick={() => this.handleDeletePerson(person.id)}>
                        Delete Person</Button> */}

                <Button color="red" onClick={() => deletePerson(person.id)}>
                    Delete Person</Button>
                <Button color="orange" floated="right" as={Link} to={`/managePerson/${person.id}`}>
                    Manage Person
                </Button>
            </Segment>
        </Segment.Group >
    );

};


// export default connect(mapState, actions)(PersonsDetailedHeader);

export default PersonsDetailedHeader;