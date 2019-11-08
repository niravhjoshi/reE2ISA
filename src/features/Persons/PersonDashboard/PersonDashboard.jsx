import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonList from '../PersonList/PersonList';
import { connect } from 'react-redux';
import { createPerson, updatePerson, deletePerson } from '../personsActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { firestoreConnect } from 'react-redux-firebase'

const mapState = (state) => ({
    persons: state.firestore.ordered.persons,
    loading: state.async.loading
})


const actions = {
    createPerson,
    updatePerson,
    deletePerson
}


class PersonDashboard extends Component {


    handleDeletePerson = personID => {
        this.props.deletePerson(personID);
    }



    render() {

        const { persons, loading } = this.props;

        if (loading) return <LoadingComponent />
        return (
            <Grid>
                <Grid.Column width={12}>
                    <PersonList persons={persons} deletePerson={this.handleDeletePerson} />
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>

        )
    }
}

export default connect(mapState, actions)(firestoreConnect([{ collection: 'persons' }])(PersonDashboard));