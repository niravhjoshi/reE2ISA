import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';

class PersonList extends Component {
    render() {
        return (
            <Fragment>
                {this.props.events.map(person => (
                    <PersonListItem key={person.id} person={person} />
                ))}


            </Fragment>
        )
    }
}

export default PersonList

