import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import PersonList from './PersonList/PersonList';
import PersonForm from './PersonForm/PersonForm';

const personsfromDB = [
    {
        id: '1',
        PersonName: 'Nirav Joshi',
        Birthdate: '2018-03-27',
        Sex: 'Male',
        PersonImage: 'https://randomuser.me/api/portraits/men/20.jpg',

    },
    {
        id: '2',
        PersonName: 'Agent Smith',
        Birthdate: '2011-03-27',
        Sex: 'Female',
        PersonImage: 'https://randomuser.me/api/portraits/men/10.jpg',

    },
]


class PersonDashboard extends Component {
    state = {
        persons: personsfromDB,
        isOpen: false
    }


    hadleIsOpenToggle = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        })
        )
    }

    render() {

        const { persons, isOpen } = this.state;

        return (

            <Grid>
                <Grid.Column width={10}>
                    <PersonList events={persons} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content='Create Person' onClick={this.hadleIsOpenToggle} />
                    {isOpen && <PersonForm cancelFormOpen={this.hadleIsOpenToggle} />}
                </Grid.Column>
            </Grid>

        )
    }
}

export default PersonDashboard