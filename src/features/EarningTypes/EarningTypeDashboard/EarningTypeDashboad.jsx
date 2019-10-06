import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import EarningTypeList from '../EarningTypeList/EarningTypeList';
import { connect } from 'react-redux';
import { createEartype, updateEartype, deleteEartype } from '../../EarningTypes/earningtypeActions';
import LoadingComponent from '../../../app/layout/LoadingComponent'




const mapState = (state) => ({
    earningtypes: state.earningtypes,
    loading: state.async.loading
})


const actions = {
    createEartype,
    updateEartype,
    deleteEartype
}


class EarningTypeDashboard extends Component {


    handleDeleteEarningtype = eartypeid => {
        this.props.deleteEartype(eartypeid);
    }



    render() {

        const { earningtypes, loading } = this.props;

        if (loading) return <LoadingComponent />
        return (
            <Grid>
                <Grid.Column width={12}>
                    <EarningTypeList earningtypes={earningtypes} deleteEartype={this.handleDeleteEarningtype} />
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>

        )
    }
}

export default connect(mapState, actions)(EarningTypeDashboard)