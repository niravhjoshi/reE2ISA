import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/Login/LoginForm';
import { CloseModal } from "./modalActions";

const actions = { CloseModal };

class LoginModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.CloseModal}
            >
                <Modal.Header>
                    Login to E2ISA App
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(LoginModal);