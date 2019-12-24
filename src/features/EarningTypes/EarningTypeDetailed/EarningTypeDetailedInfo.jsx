import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { isEmpty } from 'react-redux-firebase';
import { withFirestore } from 'react-redux-firebase';


const mapState = (state, ownProps) => {

    const earningtypeid = ownProps.match.params.id;
    let earningtype = {};

    if (state.firestore.ordered.earningTypes && state.firestore.ordered.earningTypes.length > 0) {

        earningtype = state.firestore.ordered.earningTypes.filter(earningtype => earningtype.id === earningtypeid)[0] || {}
    }

    return {
        earningtype,
        auth: state.firebase.auth
    }


}


const EarningTypeDetailedInfo = ({ earningtype }) => {
    if (typeof earningtype === "undefined" || isEmpty(earningtype)) {
        return <Redirect to={{ pathname: "/EarningTypes" }} />;
    }

    else {

        return (
            <Segment.Group>
                <Segment attached="top">
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size="large" color="teal" name="info" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>{earningtype.EarningType}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size="large" color="teal" name="info" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>{earningtype.PersonName}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="calendar" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>{earningtype.created}</span>
                        </Grid.Column>
                    </Grid>
                </Segment>


            </Segment.Group>
        )
    }
}

export default withFirestore((connect(mapState)(EarningTypeDetailedInfo)));