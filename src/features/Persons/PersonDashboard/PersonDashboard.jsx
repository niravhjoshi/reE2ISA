import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonList from '../PersonList/PersonList';
import { connect } from 'react-redux';
import { updatePerson, deletePerson, createPerson } from '../personsActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'


class PersonDashboard extends Component {

    // async componentDidMount() {
    //     this.props.getPersonDB();
    // }

    handleDeletePerson = personID => {
        this.props.deletePerson(personID);
    }


    render() {

        const { persons, loading } = this.props;
        if (loading) return <LoadingComponent />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonList persons={persons} deletePerson={this.handleDeletePerson} />
                </Grid.Column>
                <Grid.Column width={10}>
                </Grid.Column>
            </Grid>

        )
    }
}

const mapStatetoProps = (state) => ({
    persons: state.firestore.ordered.persons,
    loading: state.async.loading,
    auth: state.firebase.auth

})

const actions = {


    updatePerson,
    deletePerson,
    createPerson
}

// export default connect(mapStatetoProps, actions)(PersonDashboard);
export default compose(connect(mapStatetoProps, actions),
    firestoreConnect((props) => {
        if (!props.auth.uid) return []
        return [
            {
                collection: 'persons',
                where: [['createdUID', '==', props.auth.uid]],
                orderBy: ['created', 'desc']

            }
        ]
    }))(PersonDashboard);

// export default connect(
//     mapStatetoProps,
//     actions
// )(firestoreConnect([{ collection: 'persons' }])(PersonDashboard));
