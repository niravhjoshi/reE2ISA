import React, { Component, Fragment } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { connect } from 'react-redux';
import { OpenModal } from '../../modals/modalActions'
// import { logout } from '../../auth/Register/authActions';
import { withFirebase } from 'react-redux-firebase'

const actions = {
  OpenModal
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {
  state = {
    authenticated: false
  }
  handleSignIn = () => {
    this.props.OpenModal('LoginModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/');
  }

  handleRegister = () => {
    this.props.OpenModal('RegisterModal');
  }



  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (

      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src="/assets/images/logo.png" alt="logo" />
            E2ISA
                    </Menu.Item>
          {authenticated && (
            <Fragment>
              <Menu.Item name="Persons" exact as={NavLink} to='/Persons' />
              <Menu.Item name="Investments" as={NavLink} to='/Investments' />
              <Menu.Item name="Earnings Types" as={NavLink} to='/EarningTypes' />
              <Menu.Item name="Shares" as={NavLink} to='/Shares' />
              <Menu.Item name="Analytics" as={NavLink} to='/Analytics' />
              <Menu.Item name="Expenses" as={NavLink} to='/Expenses' />
              <Menu.Item name="Test" as={NavLink} to='/test' />

              <Menu.Item>
                <Button floated="right" as={Link} to='/CreatePerson' positive inverted content="Add Persons" />
              </Menu.Item>

            </Fragment>
          )}
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} profile={profile} />
          ) : (
              <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />)}

        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));