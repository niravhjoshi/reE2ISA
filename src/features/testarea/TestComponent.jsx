import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decre_cntr, incre_cntr } from './testAction';
import { Button } from 'semantic-ui-react';
const mapStatetoProps = (state) => ({
    data: state.test.data
})

const mapDispatchDataPropsActions = {
    decre_cntr,
    incre_cntr
}


class TestComponent extends Component {
    render() {
        const { data, decre_cntr, incre_cntr } = this.props
        return (
            <div>
                <h1>TEst Component</h1>
                <h3>The Answer for Store is :{data}</h3>
                <Button onClick={incre_cntr} positive content='Increment' />
                <Button onClick={decre_cntr} negative content='Decrement' />
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchDataPropsActions)(TestComponent)