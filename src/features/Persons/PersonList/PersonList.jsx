import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';

class PersonList extends Component {
    render() {
        const { persons, selectPerson, deletePerson } = this.props;
        return (
            <Fragment>
                {persons.map(person => (
                    <PersonListItem key={person.id} person={person} selectPerson={selectPerson} deletePerson={deletePerson} />
                ))}


            </Fragment>
        )
    }
}

export default PersonList

