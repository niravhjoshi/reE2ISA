import React from 'react'
import { Menu, Button } from 'semantic-ui-react';

const SignedOutMenu = ({ signIn }) => {
    return (
        <Menu.Item position="right">
            <Button basic inverted onClick={signIn} content="Login" />
            <Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
    )
}

export default SignedOutMenu
