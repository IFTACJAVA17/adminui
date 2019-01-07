import React, { Component } from 'react';
import { Row, Col, Button, ModalHeader, ModalBody, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';

export default class CreateTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: props.toggle,
            reload: props.reload,
            tournamentName: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            game: 1,
            users: [],
            gamesData: []
        }

    }

    componentDidMount(){
        request.get(constants.API_URL + 'tournaments').end((err, res) => {
            if(err) { console.log(err.body); return }
            this.setState({ 
                id: res.body.length + 1
             });
        });
        this.fetchGames();
    }

    submitChanges(event) {
        event.preventDefault();
        const { toggle, reload, tournamentName, startDate, endDate, startTime, endTime,  game, users, id } = this.state;
        const start = this.parseDate(startDate, startTime);
        const end = this.parseDate(endDate, endTime);
        const newTournament = {
            id: id,
            name: tournamentName,
            start: start,
            end: end,
            game: game,
            users: users,
        }
        request.post(constants.API_URL + 'tournaments').send(newTournament).set('accept', 'json').end((err, res) => {
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

    fetchGames(){
        request.get(constants.API_URL + 'games').end((err, res) => {
            if(err) { console.log(err.body); return }
            if(res.statusCode === 201 || res.statusCode === 200) {
                this.setState({
                    gamesData: res.body
                });
            }
        });
    }

    parseDate(date, time) {
        return new Date(date + ' ' + time).toISOString();
    }

    render() {
        const { toggle, startDate, endDate, startTime, endTime, gamesData, game } = this.state;
        return (
            <Modal isOpen={this.props.show} toggle={toggle}>
                <Form onSubmit={event => this.submitChanges(event)}>
                    <ModalHeader toggle={toggle}>Create tournament</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for='tournamentName'>Tournament name</Label>
                            <Input onChange={this.handleChange} type='text' name='tournamentName' id='tournamentName' placeholder='Tournament name..' />
                        </FormGroup>
                        <FormGroup>
                                <Input type='select' name='game' id='game' value={game} onChange={this.handleChange} >
                                    {
                                        gamesData.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label for='startDate'>Starting date</Label>
                                        <Input type='date' name='startDate' id='startDate' onChange={this.handleChange} value={startDate} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for='endDate'>Ending date</Label>
                                        <Input type='date' name='endDate' id='endDate' onChange={this.handleChange} value={endDate} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label for='startTime'>Starting Time</Label>
                                        <Input type='time' name='startTime' id='startTime' onChange={this.handleChange} value={startTime} placeholder='time placeholder' />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for='endTime'>Ending Time</Label>
                                        <Input type='time' name='endTime' id='endTime' onChange={this.handleChange} value={endTime} placeholder='time placeholder' />
                                    </FormGroup>
                                </Col>
                            </Row>
                    </ModalBody>
                    <Row>
                        <Col className='text-left'><Button className='btn-sm btn-default' onClick={toggle}>Cancel</Button></Col>
                        <Col className='text-right'><Button className='btn-sm btn-success'>Create</Button></Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
