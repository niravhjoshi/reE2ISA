import React,{Component} from 'react';
import {Button} from 'semantic-ui-react';
import PersonDashboard from '../../features/PersonDashboard/PersonDashboard';


class App extends Component{
    render(){

        return(
            <div>
                <h1>Re-Events</h1>
                <PersonDashboard />              
            </div>
        )
    }
}

export default App;