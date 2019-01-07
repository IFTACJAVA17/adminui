import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
      gameOpen: false,
      isOpen: false
    };
    this.toggleOptionsDropdown = this.toggleOptionsDropdown.bind(this);
    this.toggleGameDropdown = this.toggleGameDropdown.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggleOptionsDropdown() {
    this.setState({
      optionsOpen: !this.state.optionsOpen
    });
  }

  toggleGameDropdown() {
    this.setState({
      gameOpen: !this.state.gameOpen
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { gameOpen, optionsOpen } = this.state;
    return (
      <div className='admin-secondary'>
        <Navbar dark expand='md'>
          <NavbarBrand href='/'>IG Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
            <Dropdown nav inNavbar isOpen={gameOpen} toggle={this.toggleGameDropdown}>
                <DropdownToggle nav caret>
                  Games
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/Games/'>
                  Games Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href='/Tournaments/'>
                    Tournament Settings
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink href='/Users/'>Users</NavLink>
              </NavItem>
              <Dropdown nav inNavbar isOpen={optionsOpen} toggle={this.toggleOptionsDropdown}>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/Settings/'>
                  Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}