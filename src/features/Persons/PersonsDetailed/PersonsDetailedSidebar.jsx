import React, { Fragment } from 'react'
import { Segment, Item, List, Image, Label } from 'semantic-ui-react';
//import PersonForm from '../PersonForm/PersonForm';

const PersonsDetailedSidebar = ({ subperson }) => {

    //const isRoot = false;

    return (

        <Fragment>
            <div>
                <Segment
                    textAlign='center'
                    style={{ border: 'none' }}
                    attached='top'
                    secondary
                    inverted
                    color='teal'
                >
                    {subperson && subperson.length} {subperson && subperson.length === 1 ? 'Person' : 'Persons'}  Attached to Your Account
      </Segment>
                <Segment attached>
                    <List relaxed divided>
                        {subperson &&
                            Object.values(subperson).map((subperson, index) => (
                                < Item key={index} style={{ position: 'relative' }}>
                                    <Label style={{ position: 'absolute' }} color='orange' ribbon='right'>Host</Label>
                                    <Image size='tiny' src={subperson.ImageURL} />
                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header as='h3'>{subperson.FullName}</Item.Header>
                                    </Item.Content>
                                </Item>

                            ))}

                    </List>
                </Segment>
            </div>
        </Fragment >
    )
}

export default PersonsDetailedSidebar
