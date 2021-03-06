import React, { Component, Fragment } from 'react'
import PersonListItem from './PersonListItem';
import InfiniteScroll from 'react-infinite-scroller';

class PersonList extends Component {
    render() {
        const { loadedpersons, deletePerson, getNextPersons, morePersons, loading } = this.props;
        return (
            <Fragment>

                {loadedpersons && loadedpersons.length !== 0 && (
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={getNextPersons}
                        hasMore={!loading && morePersons}
                    >
                        {loadedpersons && loadedpersons.map(person => (
                            <PersonListItem key={person.id} person={person} deletePerson={deletePerson} />
                        ))}
                    </InfiniteScroll>
                )}
            </Fragment>
        )
    }
}

export default PersonList

