import React,{Component,Fragment} from 'react';
import PersonDashboard from '../../features/Persons/PersonDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';


class App extends Component{
    render(){

        return(
        <Fragment>
            <NavBar/>
           <Container className='main'>
                <PersonDashboard />              
           </Container>
           </Fragment>
        )
    }
}

export default App;