import React from 'react'
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import { Route, Redirect, Switch } from 'react-router';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPages from './PhotosPages';
import AccountPage from './AccountPage';
import { connect } from 'react-redux';
import { updatePassword } from '../../auth/Register/authActions'

const actions = {
    updatePassword
}
const SettingsDashboard = ({ updatePassword }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from='/Settings' to='/Settings/basic' />
                    <Route path='/Settings/basic' component={BasicPage} />
                    <Route path='/Settings/about' component={AboutPage} />
                    <Route path='/Settings/photos' component={PhotosPages} />
                    <Route path='/Settings/account'
                        render={() => <AccountPage updatePassword={updatePassword} />} />


                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    )
}

export default connect(null, actions)(SettingsDashboard)
