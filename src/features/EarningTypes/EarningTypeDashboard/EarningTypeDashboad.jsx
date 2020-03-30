import React, { Component } from 'react'
import { Grid, Loader } from 'semantic-ui-react';
import EarningTypeList from '../EarningTypeList/EarningTypeList';
import { connect } from 'react-redux';
import { getEarningTypesDD, createEarningType, updateEarningType, deleteEarningType } from '../../EarningTypes/earningtypeActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EarningTypeDashboard extends Component {

    state = {
        moreEarTypes: false,
        loadingInitial: true,
        loadedEarTypes: []
    }



    async componentDidMount() {
        // await this.props.getPersonForDD();
        let next = await this.props.getEarningTypesDD();



        // console.log(next)
        // console.log(this.props);
        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreEarTypes: true,
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
        if (this.props.EarningTypes !== prevProps.EarningTypes) {
            this.setState({
                loadedEarTypes: [...this.state.loadedEarTypes, ...this.props.EarningTypes]
            })
        }
    }

    getNextEarningType = async () => {
        const { EarningTypes } = this.props
        let lastEarTypes = EarningTypes && EarningTypes[EarningTypes.length - 1];

        // console.log(lastEarTypes)

        let next = await this.props.getEarningTypesDD(lastEarTypes);
        // console.log(next);

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
                        loading={loading} loadedearningtypes={loadedEarTypes}
                        moreEarTypes={moreEarTypes} getNextEarningType={this.getNextEarningType}
                        deleteEarningType={this.handleDeleteEarningtype} />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loading}></Loader>
                </Grid.Column>
            </Grid>

        )
    }
}


const mapStatetoProps = (state) => ({
    auth: state.firebase.auth,
    // personsDD: state.personsDD,
    loading: state.async.loading,
    EarningTypes: state.earningtypes
})


const actions = {
    getEarningTypesDD,
    createEarningType,
    updateEarningType,
    deleteEarningType,
    // getPersonForDD

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
