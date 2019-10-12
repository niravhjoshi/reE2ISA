import React, { Component } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deletePerson } from '../personsActions';
import { connect } from 'react-redux';
import { format, parseISO } from 'date-fns';

const mapState = (state) => ({
    persons: state.persons,
})

const actions = {

    deletePerson
}

class PersonsDetailedHeader extends Component {

    handleDeletePerson = personID => {
        this.props.deletePerson(personID);

    }


    render() {
        const { person } = this.props;

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
                                    <p>BirthDate:  <strong>{person.BirthDate && format(parseISO(person.BirthDate), 'EEEE do LLLL')}</strong></p>
                                    <p>
                                        Sex: <strong>{person.Sex}</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>

                <Segment attached="bottom">
                    <Button color="red" onClick={() => this.handleDeletePerson(person.id)}>
                        Delete Person</Button>



                    <Button color="orange" floated="right" as={Link} to={`/managePerson/${person.id}`}>
                        Manage Person
                </Button>
                </Segment>
            </Segment.Group >
        )

    }
}

export default connect(mapState, actions)(PersonsDetailedHeader);