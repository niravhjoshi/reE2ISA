import React, { Component, Fragment } from 'react'
import EarningTypeListitem from './EarningTypeListitem';

class EarningTypeList extends Component {
    render() {
        const { earningtypes, deleteEarningType } = this.props;
        return (
            <Fragment>
                {earningtypes && earningtypes.map(earningtype => (
                    <EarningTypeListitem
                        key={earningtype.id}
                        earningtype={earningtype}
                        deleteEarningType={deleteEarningType} />

                ))}
            </Fragment>
        )
    }
}

export default EarningTypeList

