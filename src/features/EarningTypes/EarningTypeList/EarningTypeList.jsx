import React, { Component, Fragment } from 'react'
import EarningTypeListitem from './EarningTypeListitem';

class EarningTypeList extends Component {
    render() {
        const { earningtypes, deleteEartype } = this.props;
        return (
            <Fragment>
                {earningtypes && earningtypes.map(earningtype => (
                    <EarningTypeListitem
                        key={earningtype.id}
                        earningtype={earningtype}
                        deleteEartype={deleteEartype} />

                ))}
            </Fragment>
        )
    }
}

export default EarningTypeList

