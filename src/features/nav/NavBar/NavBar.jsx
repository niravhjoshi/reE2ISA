import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {

  state = {
    authenticated: false,
  }



  handleSignIn = () => this.setState({ authenticated: true })


  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push('/');
  }



  render() {
    const { authenticated } = this.state;
    return (

      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src="/assets/images/logo.png" alt="logo" />
            E2ISA
                    </Menu.Item>
          <Menu.Item name="Persons" as={NavLink} to='/Persons' />
          <Menu.Item>
            <Button floated="right" as={Link} to='/CreatePerson' positive inverted content="Add Persons" />
          </Menu.Item>
          <Menu.Item name="Investments" as={NavLink} to='/Investments' />
          <Menu.Item name="Earnings" as={NavLink} to='/Earnings' />
          <Menu.Item name="Shares" as={NavLink} to='/Shares' />
          <Menu.Item name="Analytics" as={NavLink} to='/Analytics' />
          <Menu.Item name="Expenses" as={NavLink} to='/Expenses' />
          <Menu.Item name="Test" as={NavLink} to='/test' />
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} /> : <SignedOutMenu signIn={this.handleSignIn} />}

        </Container>
      </Menu>
    )
  }
}

export default withRouter(NavBar);