import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import EarningTypeList from '../EarningTypeList/EarningTypeList';
import { connect } from 'react-redux';
import { fetchEarningTypes, createEarningType, updateEarningType, deleteEarningType, getPersonForDD } from '../../EarningTypes/earningtypeActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EarningTypeDashboard extends Component {

    state = {
        moreEarTypes: false,
        loadingInitial: true,
        loadedEarTypes: []
    }



    async componentDidMount() {
        // await this.props.getPersonForDD();
        let next = await this.props.fetchEarningTypes();


        // console.log(next)
        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreEarTypes: true,
                loadingInitial: false
            })
        }

    }
    componentDidUpdate = (prevProps) => {
        if (this.props.EarTypes !== prevProps.EarTypes) {
            this.setState({
                loadedEarType: [...this.state.loadedEarType, ...this.props.EarTypes]
            })
        }
    }

    getNextEarningType = async () => {
        const { earTypes } = this.props
        let lastEarTypes = earTypes && earTypes[earTypes.length - 1];
        console.log(lastEarTypes)
        let next = await this.props.fetchEarningTypes(lastEarTypes);
        console.log(next);
        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                moreEarTypes: false
            })
        }
    }

    handleDeleteEarningtype = eartypeid => {
        this.props.deleteEarningType(eartypeid);

    }



    render() {

        const { loading } = this.props;
        const { moreEarTypes, loadedEarTypes } = this.state;

        if (this.state.loadingInitial) return <LoadingComponent />;
        return (
            <Grid>
                <Grid.Column width={12}>
                    <EarningTypeList
                        loading={loading} moreEarTypes={moreEarTypes}
                        earningtypes={loadedEarTypes} getNextEarningType={this.getNextEarningType}
                        deleteEarningType={this.handleDeleteEarningtype} />
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>

        )
    }
}


const mapStatetoProps = (state) => ({
    auth: state.firebase.auth,
    personsDD: state.personsDD,
    loading: state.async.loading,
    EarningTypes: state.EarningTypes
})


const actions = {
    fetchEarningTypes,
    createEarningType,
    updateEarningType,
    deleteEarningType,
    getPersonForDD

}


export default connect(mapStatetoProps, actions)(EarningTypeDashboard);
// export default compose(connect(mapStatetoProps, actions),
//     firestoreConnect((props) => {
//         if (!props.auth.uid) return []
//         return [
//             {
//                 collection: 'earningTypes',
//                 where: [
//                     ['createdUID', '==', props.auth.uid]
//                 ]

//             }
//         ]
//     }))(EarningTypeDashboard);
