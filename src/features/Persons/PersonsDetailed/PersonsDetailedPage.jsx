import React from 'react'
import { Grid } from 'semantic-ui-react';
import PersonsDetailedHeader from './PersonsDetailedHeader';
import PersonDetailedInfo from './PersonDetailedInfo';
import PersonsDetailedSidebar from './PersonsDetailedSidebar';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import { isEmpty } from 'react-redux-firebase';


const mapState = (state, ownProps) => {

    const personId = ownProps.match.params.id;
    let person = {};

    if (personId && state.persons.length > 0) {
        person = state.persons.filter(person => person.id === personId)[0];
    }

    return {
        person
    }


}

const PersonsDetail = ({ person }) => {
    if (typeof person === "undefined" || isEmpty(person)) {
        return <Redirect to={{ pathname: "/persons" }} />;
    }

    else {
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

export default withRouter(connect(mapState)(PersonsDetail));
