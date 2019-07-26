import React from 'react'
import { Segment, Container, Button, Icon, Header, Image } from 'semantic-ui-react';

const Homepage = ({ history }) => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image
                        size='massive'
                        src='/assets/images/logo.png'
                        alt='logo'
                        style={{ marginBottom: 12 }}
                    />
                    Welcome to E2ISA
              </Header>
                <Button size='huge' inverted onClick={() => history.push('/persons')}>
                    Get started
                <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    )
}

export default Homepage
