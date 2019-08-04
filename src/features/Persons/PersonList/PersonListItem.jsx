import React, { Component } from 'react'
import { Table, Item, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PersonListItem extends Component {
    render() {

        const { person, deletePerson } = this.props;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>BirthDate</Table.HeaderCell>
                        <Table.HeaderCell>Sex</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>

                        <Table.Cell collapsing>{person.FullName}</Table.Cell>
                        <Table.Cell collapsing>{person.BirthDate}<Icon name="clock" /></Table.Cell>
                        <Table.Cell collapsing>{person.Sex}</Table.Cell>
                        <Table.Cell > <Item.Image size="small" src={person.ImageURL} /></Table.Cell>
                        <Table.Cell collapsing><Icon name="mail" />{person.Email}</Table.Cell>

                        <Table.Cell collapsing>
                            <Button inverted color='teal' as={Link} to={`/persons/${person.id}`}>View</Button>
                            <Button inverted color='red' onClick={() => deletePerson(person.id)}>Delete</Button>
                        </Table.Cell>

                    </Table.Row>

                </Table.Body>

            </Table>
        )
    }
}

export default PersonListItem