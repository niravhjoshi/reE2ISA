import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthBetween } from 'revalidate';
import { createEarningType, updateEarningType, deleteEarningType } from '../earningtypeActions';
import TextInput from '../../../app/form/TextInput';
import SelectInput from '../../../app/form/SelectInput';
import { withFirestore } from 'react-redux-firebase';

const SexType = [
    { key: 'Male', text: 'Male', value: 'Male' },
    { key: 'Female', text: 'Female', value: 'Female' },
    { key: 'None', text: 'None', value: 'None' },

];

const actions = { createEarningType, updateEarningType, deleteEarningType };

const mapState = (state, ownProps) => {
    const earningTypeID = ownProps.match.params.id;
    let earningType = {};
    if (state.firestore.ordered.earningTypes && state.firestore.ordered.earningTypes.length > 0) {
        earningType = state.firestore.ordered.earningTypes.filter(earningType => earningType.id === earningTypeID)[0] || {};
    }


    return {
        initialValues: earningType,
        earningType
    }

}

const validate = combineValidators({
    EarningTypeName: composeValidators(
        isRequired({ message: 'The FullName is needed' }),
        hasLengthBetween(1, 50)({ message: 'Earning Type must be between 1 to 50 char' })

    )()

})


class EarningTypeForm extends Component {

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`earningTypes/${match.params.id}`);
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`earningTypes/${match.params.id}`);
    }


    onFormSubmit = async values => {
        try {
            if (this.props.initialValues.id) {
                this.props.updateEarningType(values);
                this.props.history.push(`/earningTypes/${this.props.initialValues.id}`)
            }
            else {
                // values.BirthDate = new Date(values.BirthDate)
                let createdEarningType = await this.props.createEarningType(values);
                this.props.history.push(`/earningTypes/${createdEarningType.id}`)
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
                        <Header sub color='teal' content='Earning Types Details' />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>

                            <Field name='EarningType' component={TextInput} placeholder="Earning Types" />

                            {/* <Field name='BirthDate' component={DateInput}
                                dateFormat="dd LLL yyyy h:mm a"
                                showTimeSelect
                                timeFormat='HH:mm'
                                placeholder="Birth Date" /> */}
                            <Header sub color='teal' content='Person Type' />
                            <Field name='PersonName' component={SelectInput} options={SexType} placeholder="Select Your Person for " />

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button type="button" onClick={initialValues.id
                                ? () => history.push(`/earningTypes/${initialValues.id}`)
                                : () => history.push('/earningTypes')

                            }>Cancel</Button>
                        </Form>
                    </Segment >
                </Grid.Column>
            </Grid >

        )
    }
}


export default withFirestore(connect(mapState, actions)(
    reduxForm({ form: 'EarningTypeForm', validate, enableReinitialize: true })(EarningTypeForm)));


