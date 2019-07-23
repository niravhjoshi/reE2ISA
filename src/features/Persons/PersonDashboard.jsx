import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import PersonList from './PersonList/PersonList';
import PersonForm from './PersonForm/PersonForm';
import cuid from 'cuid';

const personsfromDB = [
    {
        id: '1',
        FullName: 'Nirav Joshi',
        BirthDate: '2018-03-27',
        Sex: 'Male',
        ImageURL: 'https://randomuser.me/api/portraits/men/20.jpg',

    },
    {
        id: '2',
        FullName: 'Agent Smith',
        BirthDate: '2011-03-27',
        Sex: 'Female',
        ImageURL: 'https://randomuser.me/api/portraits/men/10.jpg',

    },
]


class PersonDashboard extends Component {
    state = {
        persons: personsfromDB,
        isOpen: false,
        selectedPerson: null,
    }


    // hadleIsOpenToggle = () => {
    //     this.setState(({ isOpen }) => ({
    //         isOpen: !isOpen
    //     })
    //     )
    // }

    handleCreateFromOopen = () => {
        this.setState({
            isOpen: true,
            selectedPerson: null
        })
    }

    handleCancelForm = () => {
        this.setState({
            isOpen: false,

        })
    }

    handleCreatePerson = (newPerson) => {

        newPerson.id = cuid();
        newPerson.ImageURL = 'https://randomuser.me/api/portraits/men/30.jpg';
        this.setState(({ persons }) => ({
            persons: [...persons, newPerson],
            isOpen: false
        }))
    }

    handleSelectPerson = (person) => {
        // console.log(event);
        console.log(person);

        this.setState({
            selectedPerson: person,
            isOpen: true
        })
    }

    handleUpdatePerson = (updatedPerson) => {
        this.setState(({ persons }) => ({
            persons: persons.map(person => {
                if (person.id === updatedPerson.id) {
                    return { ...updatedPerson }
                } else {
                    return person
                }
            })
            , isOpen: false, selectedPerson: null
        }))

    }

    handleDeletePerson = (PerID) => {
        this.setState(({ persons }) => ({
            persons: persons.filter(p => p.id !== PerID)
        }))
    }



    render() {

        const { persons, isOpen, selectedPerson } = this.state;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <PersonList persons={persons} selectPerson={this.handleSelectPerson} deletePerson={this.handleDeletePerson} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content='Create Person' onClick={this.handleCreateFromOopen} />
                    {isOpen && (
                        <PersonForm
                            key={selectedPerson ? selectedPerson.id : 0}
                            updatedPerson={this.handleUpdatePerson}
                            selectedPerson={selectedPerson}
                            createPerson={this.handleCreatePerson}
                            cancelFormOpen={this.handleCancelForm}
                        />
                    )}
                </Grid.Column>
            </Grid>

        )
    }
}

export default PersonDashboard