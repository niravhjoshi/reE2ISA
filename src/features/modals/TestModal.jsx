import React from 'react'
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CloseModal } from './modalActions'
const actions = {
    CloseModal
}
const TestModal = ({ CloseModal }) => {
    return (
        <Modal closeIcon="close" open={true} onClose={CloseModal}>
            <Modal.Header>Test Modal</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>Test Modal... nothing to see here</p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default connect(null, actions)(TestModal);
