import React, { Component } from 'react'
import { Segment, Form, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createPerson, updatePerson } from '../personsActions';
import cuid from 'cuid';


const mapState = (state, ownProps) => {
    const personId = ownProps.match.params.id;

    let person = {
        FullName: '',
        BirthDate: '',
        Email: '',
        Sex: '',
        ImageURL: '',
    }

    if (personId && state.persons.length > 0) {
        person = state.persons.filter(person => person.id === personId)[0]
    }

    return {
        person
    }

}

const actions = { createPerson, updatePerson };

class PersonForm extends Component {
    state = { ...this.props.person };

    //Life Cycle Methods
    componentDidMount() {
        if (this.props.selectedPerson !== null) {
            this.setState(
                { ...this.props.selectedPerson }
            )
        }
    }

    handleSubmitMethod = event => {
        event.preventDefault();
        console.log(this.state);
        if (this.state.id) {
            this.props.updatePerson(this.state);
            this.props.history.push(`/persons/${this.state.id}`)
        }
        else {
            const newPerson = {
                ...this.state,
                id: cuid(),
                ImageURL: 'https://randomuser.me/api/portraits/men/30.jpg'
            }
            this.props.createPerson(newPerson);
            this.props.history.push(`/persons/${newPerson.id}`)
        }

    }

    handleInputFormChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    }

    handleRadioiChange = (e, { value }) => {
        this.setState({ Sex: value })
    }
    render() {

        // const { cancelFormOpen } = this.props;
        const { FullName, BirthDate, Email, ImageURL } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.handleSubmitMethod} autoComplete='Off'>
                    <Form.Field>
                        <label>Person Full Name</label>
                        <input name='FullName' onChange={this.handleInputFormChange} value={FullName} placeholder="Full Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Birth Date Name</label>
                        <input name='BirthDate' value={BirthDate} onChange={this.handleInputFormChange} type="date" placeholder="Birth Date" />
                    </Form.Field>

                    <Form.Field>
                        <label>Email Address</label>
                        <input name='Email' value={Email} onChange={this.handleInputFormChange} type="Email" placeholder="Email Address" />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Male'
                            name='Sex1'
                            value="Male"
                            checked={this.state.Sex === 'Male'}
                            onChange={this.handleRadioiChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Female'
                            name='Sex1'
                            value="Female"
                            checked={this.state.Sex === 'Female'}
                            onChange={this.handleRadioiChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='None'
                            name='Sex1'
                            value="None"
                            checked={this.state.Sex === 'None'}
                            onChange={this.handleRadioiChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Person Image</label>
                        <input name="ImageURL" value={ImageURL} onChange={this.handleInputFormChange} placeholder="Image URL" />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                     </Button>
                    <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                </Form>
            </Segment >
        )
    }
}


export default connect(mapState, actions)(PersonForm);