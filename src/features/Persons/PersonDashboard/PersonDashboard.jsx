import React, { Component, createRef } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import PersonList from '../PersonList/PersonList';
import { connect } from 'react-redux';
import { getPersonsForDashboard } from '../personsActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'



const mapStatetoProps = (state) => ({
    persons: state.persons,
    loading: state.async.loading

})



const actions = {

    getPersonsForDashboard
}


class PersonDashboard extends Component {

    // contextRef = createRef();
    // state = {
    //     morepersons: false,
    //     loadingInitial: true,
    //     loadedPersons: []
    // }

    async componentDidMount() {
        this.props.getPersonsForDashboard();

        // if (next && next.docs && next.docs.length > 1) {
        //     this.setState({
        //         morepersons: true,
        //         loadingInitial: false
        //     });
        // }
    }

    // componentDidUpdate = prevProps => {
    //     if (this.props.persons !== prevProps.persons) {
    //         this.setState({
    //             loadedPersons: [...this.state.loadedPersons, ...this.props.persons]
    //         });
    //     }
    // };

    // getNextPersons = async () => {
    //     const { persons } = this.props;
    //     let lastPerson = persons && persons[persons.length - 1];
    //     let next = await this.props.getEventsForDashboard(lastPerson);
    //     if (next && next.docs && next.docs.length <= 1) {
    //         this.setState({
    //             morepersons: false
    //         });
    //     }
    // };



    render() {

        const { persons, loading } = this.props;
        // const { morepersons, loadedPersons } = this.state;
        // // if (this.state.loadingInitial) return <LoadingComponent />;
        if (loading) return <LoadingComponent />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <div ref={this.contextRef}>
                        <PersonList
                            // loading={loading}
                            persons={persons}
                            morepersons={persons}
                            getNextPersons={this.getNextPersons}
                            deletePerson={this.handleDeletePerson} />
                        {/* <EarningTypeForm person={persons} /> */}
                    </div>
                </Grid.Column>
                <Grid.Column width={10}>

                    {/* <Loader active={loading} /> */}

                </Grid.Column>
            </Grid>

        )
    }
}

export default connect(mapStatetoProps, actions)(PersonDashboard);

// export default compose(connect(mapStatetoProps, actions),
//     firestoreConnect((props) => {
//         if (!props.auth.uid) return []
//         return [
//             {
//                 collection: 'persons',
//                 where: [
//                     ['createdUID', '==', props.auth.uid]
//                 ]

//             }
//         ]
//     }))(PersonDashboard);


