import React, { Component } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import SearchInput from 'react-search-input';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Row>
                <Col xs='1' />
                    <Col xs='10'><h1 style={{marginTop: '50px', marginLeft: '50px', textAlign: 'left'}}>Users</h1></Col>
                <Col xs='1' />
                </Row>
                <Row>
                    <Col xs='3' />
                    <Col xs='6'><SearchInput inputClassName='form-control my-2 center' /></Col>
                    <Col xs='3' />
                </Row>
                <Row>
                    <Col xs='1' />
                    <Col xs='10'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'>1</th>
                                    <td>kallekula</td>
                                    <td>Kalle Knutsson</td>
                                    <td><Button onClick={this.toggleModal}>User Settings</Button></td>
                                </tr>
                                <tr>
                                    <th scope='row'>2</th>
                                    <td>Mr_Arne</td>
                                    <td>Arne Anka</td>
                                    <td><Button onClick={this.toggleModal}>User Settings</Button></td>
                                </tr>
                                <tr>
                                    <th scope='row'>3</th>
                                    <td>sndvll</td>
                                    <td>Emil Sundvall</td>
                                    <td><Button onClick={this.toggleModal}>User Settings</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs='1' />
                </Row>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModal}>Edit User</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for='userName'>Game Name</Label>
                                    <Input type='text' name='user-name' id='userName' placeholder='Username' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='fullName'>Full name</Label>
                                    <Input type='text' name='full-name' id='fullName' placeholder='Users full name..' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='password'>Password</Label>
                                    <Input type='password' name='password' id='password' placeholder='Change password for user..' />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' checked />{' '}
                                        Admin
                                </Label>
                                </FormGroup><br />
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' />{' '}
                                        Moderator
                                </Label>
                                </FormGroup><br />
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' />{' '}
                                        Blocked
                                </Label>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={this.toggleModal}>Spara</Button>{' '}
                            <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}