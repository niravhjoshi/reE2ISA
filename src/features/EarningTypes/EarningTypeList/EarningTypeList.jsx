import React, { Component, Fragment } from 'react'
import EarningTypeListitem from './EarningTypeListitem';

class EarningTypeList extends Component {
    render() {
        const { earningtypes, deletearningtype } = this.props;
        return (
            <Fragment>
                {earningtypes.map(earningtype => (
                    <EarningTypeListitem
                        key={earningtype.id}
                        earningtypes={earningtype}
                        deletearningtype={deletearningtype} />
                ))}


            </Fragment>
        )
    }
}

export default EarningTypeList

