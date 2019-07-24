import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
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


          <Menu.Item position="right">
            <Button basic inverted content="Login" />
            <Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

export default NavBar