import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';
// import InfiniteScroll from 'react-infinite-scroller';

class PersonList extends Component {
    render() {
        const { persons, deletePerson } = this.props;
        return (
            <Fragment>
                {persons && persons.length !== 0 && persons.map(
                    person => (<PersonListItem key={person.id} person={person} deletePerson={deletePerson} />))

                }
            </Fragment>
        )
    }
}

export default PersonList

