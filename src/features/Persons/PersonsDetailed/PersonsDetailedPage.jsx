import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonsDetailedHeader from './PersonsDetailedHeader';
import PersonDetailedInfo from './PersonDetailedInfo';
import PersonsDetailedSidebar from './PersonsDetailedSidebar';
import { connect } from 'react-redux';
import { withFirestore, isEmpty } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { deletePerson } from '../personsActions';
// import { firestoreConnect } from 'react-redux-firebase';


const mapState = (state, ownProps) => {
    const personId = ownProps.match.params.id;

    let person = {};
    if (state.firestore.ordered.persons &&
        state.firestore.ordered.persons.length > 0) {

        person = state.firestore.ordered.persons.filter(person => person.id === personId)[0] || {}
    }

    return {
        person,
        auth: state.firebase.auth
    }
}

const actions = {
    deletePerson,

};


class PersonsDetail extends Component {
    handleDeletePerson = personID => {
        this.props.deletePerson(personID);
    }

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`persons/${match.params.id}`);

    }
    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`persons/${match.params.id}`);
    }

    render() {
        const { person } = this.props;
        if (typeof person === "undefined" || isEmpty(person)) {
            return <Redirect to={{ pathname: "/persons" }} />;
        }


        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonsDetailedHeader person={person} deletePerson={this.handleDeletePerson} />
                    <PersonDetailedInfo person={person} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <PersonsDetailedSidebar subperson={person.subperson} />
                </Grid.Column>
            </Grid>
        )
    }


}


export default withFirestore(connect(mapState, actions)(PersonsDetail));

// export default withRouter(connect(mapState)(firestoreConnect([{ collection: 'persons' }])(PersonsDetail)));
