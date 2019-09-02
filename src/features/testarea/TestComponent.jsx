import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementAsync, decrementAsync } from './testAction';

import { Button } from 'semantic-ui-react';
import { OpenModal } from '../modals/modalActions';

const mapStatetoProps = (state) => ({
    data: state.test.data,
    loading: state.async.loading,
    buttonName: state.async.elementName
})

const mapDispatchDataPropsActions = {
    incrementAsync,
    decrementAsync,
    OpenModal
}


class TestComponent extends Component {
    render() {
        const { data, decrementAsync, incrementAsync, OpenModal, loading, buttonName } = this.props
        return (
            <div>
                <h1>TEst Component</h1>
                <h3>The Answer for Store is :{data}</h3>
                <Button name='increment' loading={buttonName === 'increment' && loading}
                    onClick={(e) => incrementAsync(e.target.name)}
                    positive content='Increment' />

                <Button name='decrement' loading={buttonName === 'decrement' && loading}
                    onClick={(e) => decrementAsync(e.target.name)}
                    negative content='Decrement' />
                <Button
                    onClick={() => OpenModal('TestModal', { data: 42 })}
                    color='teal'
                    content='Open Modal' />
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchDataPropsActions)(TestComponent)