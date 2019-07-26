import React, { Component } from 'react'
import { Table, Item, Icon, Button } from 'semantic-ui-react';

class PersonListItem extends Component {
    render() {

        const { person, selectPerson, deletePerson } = this.props;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>BirthDate</Table.HeaderCell>
                        <Table.HeaderCell>Sex</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{person.FullName}</Table.Cell>
                        <Table.Cell>{person.BirthDate}<Icon name="clock" /></Table.Cell>
                        <Table.Cell>{person.Sex}</Table.Cell>
                        <Table.Cell> <Item.Image size="small" src={person.ImageURL} /></Table.Cell>
                        <Table.Cell>
                            <Button inverted color='teal' onClick={() => selectPerson(person)}>View</Button>
                            <Button inverted color='red' onClick={() => deletePerson(person.id)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>

            </Table>
        )
    }
}

export default PersonListItem