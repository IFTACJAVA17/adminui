import React, { Component } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import SearchInput from 'react-search-input';

export default class Games extends Component {
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
                    <Col xs='10'><h1 style={{marginTop: '50px', marginLeft: '50px', textAlign: 'left'}}>Games</h1></Col>
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
                                    <th>Game</th>
                                    <th>Github</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'>1</th>
                                    <td>Hextris</td>
                                    <td>https://github.com/Hextris/hextris</td>
                                    <td><Button onClick={this.toggleModal}>Edit</Button> <Button color='danger'>Delete</Button></td>
                                </tr>
                                <tr>
                                    <th scope='row'>2</th>
                                    <td>Clumsy Bird</td>
                                    <td>https://github.com/ellisonleao/clumsy-bird</td>
                                    <td><Button onClick={this.toggleModal}>Edit</Button> <Button color='danger'>Delete</Button></td>
                                </tr>
                                <tr>
                                    <th scope='row'>3</th>
                                    <td>Untrusted</td>
                                    <td>https://github.com/AlexNisnevich/untrusted</td>
                                    <td><Button onClick={this.toggleModal}>Edit</Button> <Button color='danger'>Delete</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs='1' />
                </Row>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModal}>Edit game</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for='gameName'>Game Name</Label>
                                    <Input type='text' name='game-name' id='gameName' placeholder='Game name' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='githubUrl'>Github URL</Label>
                                    <Input type='text' name='github-url' id='githubUrl' placeholder='http://Github URL' />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' checked />{' '}
                                        Active
                                </Label>
                                </FormGroup><br />
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' checked />{' '}
                                        Featured
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