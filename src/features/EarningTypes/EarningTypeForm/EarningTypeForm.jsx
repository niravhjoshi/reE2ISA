import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthBetween } from 'revalidate';
import { createEarningType, updateEarningType, deleteEarningType } from '../earningtypeActions';
import TextInput from '../../../app/form/TextInput';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import SelectInput from '../../../app/form/SelectInput';
import { compose } from 'redux';

var PersonsArray = [
    { rno: '1', retx: 'Harry', rvalue: 'Harry' },
    { rno: '2', retx: 'John', rvalue: 'John' },
    { rno: '3', retx: 'Jane', rvalue: 'Jane' },

];

for (var i = 0; i < PersonsArray.length; i++) {
    PersonsArray[i].key = PersonsArray[i].rno;
    PersonsArray[i].text = PersonsArray[i].retx;
    PersonsArray[i].value = PersonsArray[i].rvalue;
    delete PersonsArray[i].rno;
    delete PersonsArray[i].retx;
    delete PersonsArray[i].rvalue;
    // console.log(PersonsArray)

}
//console.log(PersonsArray)

const actions = { createEarningType, updateEarningType, deleteEarningType };

const mapState = (state, ownProps) => {
    const earningTypeID = ownProps.match.params.id;
    let earningType = {};
    let personsName = [];
    personsName = state.firestore.ordered.persons
    if (state.firestore.ordered.earningTypes && state.firestore.ordered.earningTypes.length > 0) {
        earningType = state.firestore.ordered.earningTypes.filter(earningType => earningType.id === earningTypeID)[0] || {};

    }

    return {
        initialValues: earningType,
        earningType,
        auth: state.firebase.auth,
        personsName

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
                this.props.history.push(`/earningtype/${this.props.initialValues.id}`)
            }
            else {
                // values.BirthDate = new Date(values.BirthDate)
                let createdEarningType = await this.props.createEarningType(values);
                this.props.history.push(`/earningtype/${createdEarningType.id}`)
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    render() {
        const { history, initialValues, invalid, submitting, pristine, personsName } = this.props;

        personsName && console.log(personsName)

        for (var i = 0; i < personsName.length; i++) {
            personsName[i].key = personsName[i].id;
            personsName[i].text = personsName[i].FullName;
            personsName[i].value = personsName[i].FullName;
            delete personsName[i].id;
            delete personsName[i].FullName;

            // console.log(PersonsArray)

        }
        console.log(personsName)



        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Earning Types Details' />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>

                            <Field name='EarningType' component={TextInput} placeholder="Earning Types" />
                            <Field name='PersonName' component={SelectInput} options={personsName} placeholder="Select Your Person" />

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button type="button" onClick={initialValues.id
                                ? () => history.push(`/earningtype/${initialValues.id}`)
                                : () => history.push('/earningtypes')

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


// export default compose(connect(mapState, actions),
//     firestoreConnect((props) => {
//         if (!props.auth.uid) return []
//         return [
//             {
//                 collection: 'persons',
//                 where: [
//                     ['createdUID', '==', props.auth.uid]
//                 ]

//             }
//         ]
//     }), reduxForm({ form: 'EarningTypeForm', validate, enableReinitialize: true }))(EarningTypeForm);