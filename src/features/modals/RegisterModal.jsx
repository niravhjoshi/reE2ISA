import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { CloseModal } from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";

const actions = { CloseModal };

class RegisterModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.CloseModal}
            >
                <Modal.Header>
                    Sign Up to E2ISA your complete finance freind!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(RegisterModal);