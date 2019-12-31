import React, { Component } from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, isEmpty } from 'react-redux-firebase';
import { format } from 'date-fns';
import { deleteEarningType } from '../../EarningTypes/earningtypeActions';
import { Link } from 'react-router-dom';


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


const actions = {

    deleteEarningType
}


class EarningTypeDetailedInfo extends Component {


    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`earningTypes/${match.params.id}`);
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`earningTypes/${match.params.id}`);

    }

    render() {

        const { deleteEarningType, earningtype, history } = this.props;

        if (typeof earningtype === "undefined" || isEmpty(earningtype)) {
            history.push('/earningtypes')
        }

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
                            {/* <span> {earningtype.created && format(earningtype.created.toDate(), 'EEEE do LLL')} at {format(earningtype.created.toDate(), 'h:mm a')}</span> */}
                            <span>{earningtype.created && format(earningtype.created.toDate(), 'EEEE do LLL')}</span>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment attached="bottom">
                    {/* <Button color="red" onClick={() => this.handleDeletePerson(person.id)}>
                        Delete Person</Button> */}

                    <Button inverted color='orange' floated="right" as={Link} to={`/manageEarningType/${earningtype.id}`}>
                        Manage Earning Type
                </Button>

                    <Button color="red" onClick={() => deleteEarningType(earningtype.id)}>
                        Delete Earning Type</Button>

                </Segment>
            </Segment.Group>
        )

    }
}

export default withFirestore((connect(mapState, actions)(EarningTypeDetailedInfo)));
// export default (EarningTypeDetailedInfo);