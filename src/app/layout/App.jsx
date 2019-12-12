import React, { Component, Fragment } from 'react';

import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SharesDetailedPage from '../../features/Shares/SharesDetailedPage/SharesDetailedPage';
import InvestmentDetailedPage from '../../features/Investments/InvestmentsDetailedPage/InvestmentDetailedPage';
import EarningDetailedPage from '../../features/Earnings/EarningsDetailedPage/EarningDetailedPage';
import ExpensesDetailedPage from '../../features/Expenses/ExpensesDetailedPage/ExpensesDetailedPage';
import AnalyticsDetailedpage from '../../features/Analytics/AnalyticsDetailedPage/AnalyticsDetailedpage';
import PersonsDetail from '../../features/Persons/PersonsDetailed/PersonsDetailedPage';
import PersonDashboard from '../../features/Persons/PersonDashboard/PersonDashboard';
import EarningTypeDetail from '../../features/EarningTypes/EarningTypeDetailed/EarningTypeDetailedInfo';
import EarningDashboard from '../../features/EarningTypes/EarningTypeDashboard/EarningTypeDashboad';
import SettingsDashboard from '../../features/Users/Settings/SettingsDashboard';
import AccountPage from '../../features/Users/Settings/AccountPage';
import PersonCreateForm from '../../features/Persons/PersonForm/PersonCreateForm';
import PersonEditForm from '../../features/Persons/PersonForm/PersonEditForm';
import Homepage from '../../features/Home/Homepage';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';
import LandingPage from '../../features/Home/LandingPage';


class App extends Component {
    render() {

        return (
            <Fragment>
                <ModalManager />
                <Route exact path='/' component={Homepage} />
                <Route path='/(.+)' render={() => (
                    <Fragment>
                        <NavBar />

                        <Container className='main'>
                            <Switch key={this.props.location.key}>
                                {/* Person Routes */}
                                <Route exact path='/Persons' component={PersonDashboard} />
                                <Route path='/Persons/:id' component={PersonsDetail} />
                                <Route path={['/CreatePerson']} component={PersonCreateForm} />
                                <Route exact path='/Persons' component={PersonDashboard} />
                                <Route path='/Persons/:id' component={PersonsDetail} />
                                <Route path={['/managePerson/:id']} component={PersonEditForm} />

                                {/* Earning Types Routes */}
                                <Route exact path='/EarningTypes' component={EarningDashboard} />
                                <Route path='/EarningTypes/:id' component={EarningTypeDetail} />

                                {/* Earning Types Page Routes */}
                                <Route path='/EarningTypes/:id' component={EarningTypeDetail} />

                                {/* Share Page Routes */}
                                <Route path='/Shares' component={SharesDetailedPage} />
                                <Route path='/Shares/:id' component={SharesDetailedPage} />

                                {/* Investment Page Routes */}
                                <Route path='/Investments' component={InvestmentDetailedPage} />
                                <Route path='/Investments/:id' component={InvestmentDetailedPage} />

                                {/* Earning Page Routes */}
                                <Route path='/Earnings' component={EarningDetailedPage} />
                                <Route path='/Earnings/:id' component={EarningDetailedPage} />

                                {/* Expense Page Routes */}
                                <Route path='/Expenses' component={ExpensesDetailedPage} />
                                <Route path='/Expenses/:id' component={ExpensesDetailedPage} />

                                {/* Landing Page Routes */}
                                <Route path='/Landing' component={LandingPage} />

                                {/* AnalyticsDetailedpage Page Routes */}
                                <Route path='/AnalyticsDetailedpage' component={AnalyticsDetailedpage} />


                                {/* Account Setting Page Routes */}
                                <Route path='/Settings' component={SettingsDashboard} />
                                <Route path='/AccountPage/:id' component={AccountPage} />
                                <Route path='/test' component={TestComponent} />
                            </Switch>
                        </Container>
                    </Fragment>

                )}
                />
            </Fragment>
        )

    }
}

export default withRouter(App);