import React, { Component } from 'react';
import { Button, ListGroupItem, Row, Col, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            collapse: false,
            userName: props.user.userName,
            fullName: props.user.fullName,
            email: props.user.email,
            bio: props.user.bio,
            admin: props.user.admin,
            moderator: props.user.moderator,
            blocked: props.user.blocked
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
    }

    toggleSettings() {
        console.log('toggle user settings');
        this.setState({ collapse: !this.state.collapse });
    }

    submitChanges(event) {
        event.preventDefault();
        const { user, userName, fullName, email, bio, admin, moderator, blocked } = this.state;
        let newData = {
            id: this.state.user.id,
            userName: userName,
            fullName: fullName,
            email: email,
            bio: bio,
            admin: admin,
            moderator: moderator,
            blocked: blocked
        }
        request.put(constants.API_URL + 'users/'+ user.id ).send(newData).set('accept', 'json').end((err, res) => {
            if(err) { console.log(err.body); return }
            if(res.status === 200 || res.status === 201) {
                this.toggleSettings();
            }
        });
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        console.log(name);
        await this.setState({
            [name]: value,
        });
    }

    render() {
        const { user, collapse, userName, fullName, email, bio, admin, moderator, blocked } = this.state;
        return (
            <ListGroupItem>
                <div>
                    <Row style={{ cursor: 'pointer' }} onClick={this.toggleSettings}>
                        <Col xs='1'>{user.id}</Col>
                        <Col>{userName} - {fullName}</Col>
                        <Col xs='1'></Col>
                    </Row>
                    <Collapse isOpen={collapse}>
                        <Form onSubmit={event => this.submitChanges(event)}>
                            <FormGroup>
                                <Label for='userName'>Username</Label>
                                <Input onChange={this.handleChange} type='text' name='userName' id='userName' value={userName} placeholder='Username' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='fullName'>Fullname</Label>
                                <Input onChange={this.handleChange} type='text' name='fullName' id='fullName' value={fullName} placeholder='Fullname' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input onChange={this.handleChange} type='text' name='email' id='email' value={email} placeholder='' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='bio'>Bio</Label>
                                <Input onChange={this.handleChange} type='textarea' name='bio' id='bio' value={bio} />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleChange} name='admin' checked={admin} type='checkbox' />{' '}Admin
                                    </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleChange} name='moderator' checked={moderator} type='checkbox' />{' '}Moderator
                                    </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleChange} name='blocked' checked={blocked} type='checkbox' />{' '}Blocked
                                    </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className='btn btn-default'>Save Changes</Button>
                        </Form>
                    </Collapse>
                </div>
            </ListGroupItem>
        )
    }
}