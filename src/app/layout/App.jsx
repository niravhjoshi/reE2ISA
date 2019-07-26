import React, { Component, Fragment } from 'react';
import PersonDashboard from '../../features/Persons/PersonDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import SharesDetailedPage from '../../features/Shares/SharesDetailedPage/SharesDetailedPage';
import InvestmentDetailedPage from '../../features/Investments/InvestmentsDetailedPage/InvestmentDetailedPage';
import EarningDetailedPage from '../../features/Earnings/EarningsDetailedPage/EarningDetailedPage';
import ExpensesDetailedPage from '../../features/Expenses/ExpensesDetailedPage/ExpensesDetailedPage';
import AnalyticsDetailedpage from '../../features/Analytics/AnalyticsDetailedPage/AnalyticsDetailedpage';
import PersonsDetail from '../../features/Persons/PersonsDetailed/PersonsDetailedPage';
import SettingsDashboard from '../../features/Users/Settings/SettingsDashboard';
import AccountPage from '../../features/Users/Settings/AccountPage';
import PersonForm from '../../features/Persons/PersonForm/PersonForm';
import Homepage from '../../features/Home/Homepage';


class App extends Component {
    render() {

        return (
            <Fragment>
                <Route exact path='/' component={Homepage} />
                <Route path='/(.+)' render={() => (
                    <Fragment>
                        <NavBar />

                        <Container className='main'>

                            <Route path='/Persons' component={PersonDashboard} />
                            <Route path='/Persons/:id' component={PersonsDetail} />
                            <Route path='/CreatePerson' component={PersonForm} />
                            <Route path='/Shares' component={SharesDetailedPage} />
                            <Route path='/Shares/:id' component={SharesDetailedPage} />
                            <Route path='/Investments' component={InvestmentDetailedPage} />
                            <Route path='/Investments/:id' component={InvestmentDetailedPage} />
                            <Route path='/Earnings' component={EarningDetailedPage} />
                            <Route path='/Earnings/:id' component={EarningDetailedPage} />
                            <Route path='/Expenses' component={ExpensesDetailedPage} />
                            <Route path='/Expenses/:id' component={ExpensesDetailedPage} />
                            <Route path='/Analytics' component={AnalyticsDetailedpage} />
                            <Route path='/Settings' component={SettingsDashboard} />
                            <Route path='/AccountPage/:id' component={AccountPage} />

                        </Container>
                    </Fragment>

                )}
                />
            </Fragment>
        )

    }
}

export default App;