import React, { Component } from 'react';
import { Row, Col, Button, ModalHeader, ModalBody, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';

export default class AddGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: props.toggle,
            reload: props.reload,
            gameName: '',
            githubUrl: '',
            bannerUrl: '',
            description: '',
            active: '',
            featured: ''
        }
    }

    componentDidMount(){
        request.get(constants.API_URL + 'games').end((err, res) => {
            if(err) { console.log(err.body); return }
            this.setState({ 
                id: res.body.length + 1
             });
        })
    }

    submitChanges(event) {
        event.preventDefault();
        const { toggle, reload, gameName, githubUrl, bannerUrl, description, active, featured, id } = this.state;
        const newGame = {
            id: id,
            name: gameName,
            desc: description,
            githubUrl: githubUrl,
            bannerUrl: bannerUrl,
            active: active,
            featured: featured
        }
        request.post(constants.API_URL + 'games').send(newGame).set('accept', 'json').end((err, res) => {
            if(err) { console.log(err.body); return }
            if(res.statusCode === 201 || res.statusCode === 200) {
                reload();
            }
            toggle();
        });
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    render() {
        const { toggle } = this.state;
        return (
            <Modal isOpen={this.props.show} toggle={toggle}>
                <Form onSubmit={event => this.submitChanges(event)}>
                    <ModalHeader toggle={toggle}>Add game</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for='gameName'>Game name</Label>
                            <Input onChange={this.handleChange} type='text' name='gameName' id='gameName' placeholder='Game name..' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='githubUrl'>Github URL</Label>
                            <Input onChange={this.handleChange} type='text' name='githubUrl' id='githubUrl' placeholder='http://Github URL..' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='bannerUrl'>Banner URL</Label>
                            <Input onChange={this.handleChange} type='text' name='bannerUrl' id='bannerUrl' placeholder='http://Banner URL..' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='description'>Game description</Label>
                            <Input onChange={this.handleChange} type='textarea' name='description' id='description' placeholder='Description..' />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={this.handleChange} name='active' type='checkbox' />{' '}Active</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={this.handleChange} name='featured' type='checkbox' />{' '}Featured</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <Row>
                        <Col className='text-left'><Button className='btn-sm btn-default' onClick={toggle}>Cancel</Button></Col>
                        <Col className='text-right'><Button className='btn-sm btn-success'>Add</Button></Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
