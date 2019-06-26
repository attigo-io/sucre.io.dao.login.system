import React, { Component, createRef, ReactNode } from 'react'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavProfile,
  Logo,
  ProfileToggle,
  ProfileDrop,
  NavbarContainer,
  NavbarWrapper, LogoImage, LogoTitle, UserName, ToggleIcon
} from './style'
import { UserAvatar } from '../image'
import { Box, Text } from 'rebass'
import ProfileDropdown from './profileDropdown'
import logo from '../globals/logo.svg'

interface IProps {
}

interface IState {
  profileDropdownIsShown?: boolean
}

class Header extends Component<IProps> {
  state: IState = {
    profileDropdownIsShown: false,
  }

  profileDropRef = createRef()

  render(): ReactNode {
    return (
      <AuthConsumer>
        {({ user, signOut }: IAuthContext) => (
          <NavbarWrapper>
            <Navbar>
              <NavbarContainer>
                {/*Logo*/}
                <Logo to={'/'}>
                  <LogoImage src={logo}/>
                  <LogoTitle>
                    Item Vault <Text as={'span'} color={'placeholder'} fontSize={'xs'}>Beta</Text>
                  </LogoTitle>
                </Logo>
                {/*Menu*/}
                <Nav>
                  <NavItem>
                    <NavLink to={'/items'}>Items</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={'/about'}>About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={'/develop'}>Develop</NavLink>
                  </NavItem>
                </Nav>
                {/*Profile*/}
                <Nav>
                  <NavProfile>
                    {user ? (
                      <ProfileDrop ref={this.profileDropRef}>
                        <ProfileToggle
                          onClick={this._onProfileDropdownToggle}
                          isActive={this.state.profileDropdownIsShown}
                        >
                          <ToggleIcon glyph={this.state.profileDropdownIsShown ? 'expand_less' : 'expand_more'}/>
                          <UserName ml={'xs'}>{user.name || user.address}</UserName>
                          <Box ml={'md'}>
                            <UserAvatar user={user} size={'sm'}/>
                          </Box>
                        </ProfileToggle>
                        <ProfileDropdown
                          isShown={this.state.profileDropdownIsShown}
                          target={this.profileDropRef.current}
                          onClickOutside={this._onProfileDropdownClickOutside}
                        />
                      </ProfileDrop>
                    ) : (
                      <NavLink to={'/signin'}>
                        Sign In
                      </NavLink>
                    )}
                  </NavProfile>
                </Nav>
              </NavbarContainer>
            </Navbar>
          </NavbarWrapper>
        )}
      </AuthConsumer>
    )
  }

  _onProfileDropdownToggle = () => {
    this.setState({
      profileDropdownIsShown: !this.state.profileDropdownIsShown,
    })
  }

  _onProfileDropdownClickOutside = () => {
    this.setState({
      profileDropdownIsShown: false,
    })
  }
}

export default Header
