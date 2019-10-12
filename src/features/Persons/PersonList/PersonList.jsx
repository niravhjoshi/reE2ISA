import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';

class PersonList extends Component {
    render() {
        const { persons, deletePerson } = this.props;
        return (
            <Fragment>
                {persons && persons.map(person => (
                    <PersonListItem
                        key={person.id}
                        person={person}
                        deletePerson={deletePerson} />
                ))}


            </Fragment>
        )
    }
}

export default PersonList

