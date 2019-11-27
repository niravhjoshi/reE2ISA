import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthBetween } from 'revalidate';
import { createPerson, updatePerson } from '../personsActions';
import TextInput from '../../../app/form/TextInput';
import SelectInput from '../../../app/form/SelectInput';
import DateInput from '../../../app/form/DateInput';
import { withFirestore } from 'react-redux-firebase';




const SexType = [
    { key: 'Male', text: 'Male', value: 'Male' },
    { key: 'Female', text: 'Female', value: 'Female' },
    { key: 'None', text: 'None', value: 'None' },

];

const actions = { createPerson, updatePerson };

const mapState = (state, ownProps) => {
    const personId = ownProps.match.params.id;
    let person = {};
    if (state.firestore.ordered.persons && state.firestore.ordered.persons.length > 0) {
        person = state.firestore.ordered.persons.filter(person => person.id === personId)[0] || {};
    }


    return {
        initialValues: person,
        person
    }

}

const validate = combineValidators({
    FullName: composeValidators(
        isRequired({ message: 'The FullName is needed' }),
        hasLengthBetween(1, 50)({ message: 'Full Name must be between 1 to 50 char' })

    )(),
    Email: composeValidators(
        isRequired({ message: 'The Email is needed' }),
        hasLengthBetween(1, 50)({ message: 'Email must be between 1 to 50 char' })
    )(),

    ImageURL: isRequired({ message: 'The Image URL needed' }),
    BirthDate: isRequired({ message: 'Birth Date is neede' })


})


class PersonForm extends Component {

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`persons/${match.params.id}`);
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`persons/${match.params.id}`);
    }


    onFormSubmit = async values => {
        try {
            if (this.props.initialValues.id) {
                this.props.updatePerson(values);
                this.props.history.push(`/persons/${this.props.initialValues.id}`)
            }
            else {
                values.BirthDate = new Date(values.BirthDate)
                let createdPerson = await this.props.createPerson(values);
                this.props.history.push(`/persons/${createdPerson.id}`)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { history, initialValues, invalid, submitting, pristine } = this.props;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Person Details' />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>

                            <Field name='FullName' component={TextInput} placeholder="Person Full Name" />
                            <Field name='Email' component={TextInput} placeholder="Email Address" />

                            <Field name='ImageURL' component={TextInput} placeholder="Image URL" />

                            <Field name='BirthDate' component={DateInput}
                                dateFormat="dd LLL yyyy h:mm a"
                                showTimeSelect
                                timeFormat='HH:mm'
                                placeholder="Birth Date" />
                            <Header sub color='teal' content='Sex Type' />
                            <Field name='Sex' component={SelectInput} options={SexType} placeholder="Select Your Sex" />

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                     </Button>
                            <Button type="button" onClick={initialValues.id
                                ? () => history.push(`/persons/${initialValues.id}`)
                                : () => history.push('/persons')

                            }>Cancel</Button>
                        </Form>
                    </Segment >
                </Grid.Column>
            </Grid >

        )
    }
}


export default withFirestore(connect(mapState, actions)(
    reduxForm({ form: 'personForm', validate, enableReinitialize: true })(PersonForm)));


