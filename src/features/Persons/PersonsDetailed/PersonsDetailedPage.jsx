import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonsDetailedHeader from './PersonsDetailedHeader';
import PersonDetailedInfo from './PersonDetailedInfo';
import PersonsDetailedSidebar from './PersonsDetailedSidebar';
import { connect } from 'react-redux';
import { withFirestore, isEmpty } from 'react-redux-firebase';
import { deletePerson } from '../personsActions';
import { Redirect } from 'react-router-dom';
// import { toastr } from "react-redux-toastr";


class PersonsDetail extends Component {

    handleDeletePerson = personID => {
        this.props.deletePerson(personID);
    }

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`persons/${match.params.id}`);

        // let person = await firestore.get(`persons/${match.params.id}`);
        // if (!person.exists) {
        //     history.push('/Persons')
        //     toastr.error('Error!', 'Person not found');
        // }
        // // console.log(person)
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`persons/${match.params.id}`);
    }

    render() {
        const { person, history } = this.props;
        if (typeof person === "undefined" || isEmpty(person)) {
            return <Redirect to={{ pathname: "/persons" }} />;
            // history.push('/Persons')
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

const mapStateProps = (state, ownProps) => {
    const personId = ownProps.match.params.id;

    let person = {};
    if (state.firestore.ordered.persons && state.firestore.ordered.persons.length > 0) {

        person = state.firestore.ordered.persons.filter(person => person.id === personId)[0] || {}
    }

    return {
        person

    }
}


const actions = {
    deletePerson,

};


export default withFirestore(connect(mapStateProps, actions)(PersonsDetail));

// export default withFirestore(connect(mapState, actions)([{ collection: 'persons' }])(PersonsDetail));
