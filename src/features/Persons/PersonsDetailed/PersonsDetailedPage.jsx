import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonsDetailedHeader from './PersonsDetailedHeader';
import PersonDetailedInfo from './PersonDetailedInfo';
import PersonsDetailedSidebar from './PersonsDetailedSidebar';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
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



class PersonsDetail extends Component {

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



        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonsDetailedHeader person={person} />
                    <PersonDetailedInfo person={person} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <PersonsDetailedSidebar subperson={person.subperson} />
                </Grid.Column>
            </Grid>
        )
    }


}


export default withFirestore(connect(mapState)(PersonsDetail));

// export default withRouter(connect(mapState)(firestoreConnect([{ collection: 'persons' }])(PersonsDetail)));
