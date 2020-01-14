import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';
import InfiniteScroll from 'react-infinite-scroller';

class PersonList extends Component {
    render() {
        const { persons, deletePerson, morepersons, getNextPersons, loading } = this.props;
        return (
            <Fragment>
                {persons && persons.length !== 0 && (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={getNextPersons}
                        hasMore={!loading && morepersons}
                        initialLoad={false}>
                        {persons && persons.map(person => (<PersonListItem key={person.id} person={person} deletePerson={deletePerson} />
                        ))}
                    </InfiniteScroll>
                )}
            </Fragment>
        )
    }
}

export default PersonList

