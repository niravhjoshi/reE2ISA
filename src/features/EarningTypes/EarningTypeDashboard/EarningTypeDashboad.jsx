import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import EarningTypeList from '../EarningTypeList/EarningTypeList';
import { connect } from 'react-redux';
import { createEarningType, updateEarningType, deleteEarningType } from '../../EarningTypes/earningtypeActions';
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'




const mapStatetoProps = (state) => ({
    earningtypes: state.firestore.ordered.earningTypes,
    auth: state.firebase.auth,
    loading: state.async.loading
})


const actions = {
    createEarningType,
    updateEarningType,
    deleteEarningType
}


class EarningTypeDashboard extends Component {


    handleDeleteEarningtype = eartypeid => {
        this.props.deleteEarningType(eartypeid);
        // this.props.history.push('/earningtypes')
    }



    render() {

        const { earningtypes } = this.props;
        if (!isLoaded(earningtypes)) return <LoadingComponent />;

        return (
            <Grid>
                <Grid.Column width={12}>
                    <EarningTypeList earningtypes={earningtypes} deleteEarningType={this.handleDeleteEarningtype} />
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>

        )
    }
}

export default compose(connect(mapStatetoProps, actions),
    firestoreConnect((props) => {
        if (!props.auth.uid) return []
        return [
            {
                collection: 'earningTypes',
                where: [
                    ['createdUID', '==', props.auth.uid]
                ]

            }
        ]
    }))(EarningTypeDashboard);
