import React, { Component } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import PersonList from '../PersonList/PersonList';
import { connect } from 'react-redux';
import { updatePerson, deletePerson, createPerson, getPersonDashboard } from '../personsActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase'


class PersonDashboard extends Component {



    state = {
        morePersons: false,
        loadingInitial: true,
        loadedPersons: []
    }


    async componentDidMount() {
        // await this.props.getPersonForDD();
        let next = await this.props.getPersonDashboard();


        // console.log(next)
        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                morePersons: true,
                loadingInitial: false
            })
        }
        if (next && next.docs.length === 0) {
            this.setState({

                loadingInitial: false
            })
        }
        if (next && next.docs.length === 1) {
            this.setState({

                loadingInitial: false
            })
        }
    }

    componentDidUpdate = prevProps => {
        if (this.props.persons !== prevProps.persons) {
            this.setState({
                // loadedPersons: [...this.props.persons]
                loadedPersons: [...this.state.loadedPersons, ...this.props.persons]
            })
        }
    }



    getNextPersons = async () => {
        const { persons } = this.props
        let lastPerson = persons && persons[persons.length - 1];
        //console.log(lastPerson)
        let next = await this.props.getPersonDashboard(lastPerson);
        //console.log(next);
        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                morePersons: false
            })
        }
    }

    handleDeletePerson = (personID) => {
        this.props.deletePerson(personID)

    }


    render() {

        const { loading } = this.props;
        const { morePersons, loadedPersons } = this.state
        if (this.state.loadingInitial) return <LoadingComponent />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonList loading={loading} loadedpersons={loadedPersons} morePersons={morePersons}
                        getNextPersons={this.getNextPersons}
                        deletePerson={this.handleDeletePerson} />

                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loading}></Loader>
                </Grid.Column>
            </Grid>

        )
    }
}

const mapStatetoProps = (state) => ({

    // persons: state.firestore.ordered.persons,
    persons: state.persons,
    loading: state.async.loading,
    auth: state.firebase.auth

})

const actions = {

    getPersonDashboard,
    updatePerson,
    deletePerson,
    createPerson,

}

export default connect(mapStatetoProps, actions)(PersonDashboard);
                                // export default compose(connect(mapStatetoProps, actions),
//     firestoreConnect((props) => {
//         if (!props.auth.uid) return []
//         return [
//             {
//                 collection: 'persons',
//                 where: [['createdUID', '==', props.auth.uid]]
//                 // orderBy: ['created', 'desc']

//             }
//         ]
//     }))(PersonDashboard);

// export default connect(
//     mapStatetoProps,
//     actions
// )(firestoreConnect([{ collection: 'persons' }])(PersonDashboard));
