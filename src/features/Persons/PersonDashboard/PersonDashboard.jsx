import React, { Component, createRef } from 'react'
import { Grid } from 'semantic-ui-react';
import PersonList from '../PersonList/PersonList';
import { connect } from 'react-redux';
import { getPersonDB, updatePerson, deletePerson } from '../personsActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapStatetoProps = (state) => ({
    persons: state.persons,
    loading: state.async.loading,
    auth: state.firebase.auth

})

const actions = {

    getPersonDB,
    updatePerson,
    deletePerson
}


class PersonDashboard extends Component {


    async componentDidMount() {
        this.props.getPersonDB();
        // console.log(this.props)
    }


    render() {

        const { persons, loading, deletePerson } = this.props;
        if (loading) return <LoadingComponent />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonList persons={persons} deletePerson={deletePerson} />
                </Grid.Column>
                <Grid.Column width={10}>
                </Grid.Column>
            </Grid>

        )
    }
}

export default connect(mapStatetoProps, actions)(PersonDashboard);

