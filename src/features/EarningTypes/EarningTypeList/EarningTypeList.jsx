import React, { Component, Fragment } from 'react'
import EarningTypeListitem from './EarningTypeListitem';

class EarningTypeList extends Component {
    render() {
        const { earningtypes, deleteEartype } = this.props;
        return (
            <Fragment>
                {earningtypes.map(earningtype => (
                    <EarningTypeListitem
                        key={earningtype.id}
                        earningtypes={earningtype}
                        deleteEartype={deleteEartype} />
                ))}


            </Fragment>
        )
    }
}

export default EarningTypeList

