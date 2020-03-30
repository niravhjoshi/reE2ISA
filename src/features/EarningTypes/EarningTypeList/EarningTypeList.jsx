import React, { Component, Fragment } from 'react'
import EarningTypeListitem from './EarningTypeListitem';
import InfiniteScroll from 'react-infinite-scroller';

class EarningTypeList extends Component {
    render() {
        const { loadedearningtypes, deleteEarningType, loading, moreEarTypes, getNextEarningType } = this.props;

        return (
            <Fragment>
                {loadedearningtypes && loadedearningtypes.length !== 0 && (
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={getNextEarningType}
                        hasMore={!loading && moreEarTypes}
                    >
                        {loadedearningtypes && loadedearningtypes.map(earningtype => (
                            <EarningTypeListitem
                                key={earningtype.id}
                                earningtype={earningtype}
                                deleteEarningType={deleteEarningType} />

                        ))}
                    </InfiniteScroll>
                )}
            </Fragment>
        )
    }
}

export default EarningTypeList

