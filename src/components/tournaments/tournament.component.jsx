import React, { Component } from 'react';
import { Button, ListGroupItem, Row, Col, Collapse, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';
import DeleteTournament from './deletetournament.component';

export default class Tournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            tournament: this.props.tournament,
            name: this.props.tournament.name,
            start: this.props.tournament.start,
            end: this.props.tournament.end,
            game: this.props.tournament.game,
            startDate: '',
            startTime: '',
            endTime: '',
            endDate: '',
            gamesData: [],
            registeredUsers: this.props.tournament.users,
            deleteTournament: false,
            reload: props.reload
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.toggleDeleteTournament = this.toggleDeleteTournament.bind(this);
    }

    componentWillMount(){
        const { start, end } = this.state;
        this.setState({
            startDate: this.parseDate(start),
            startTime: this.parseTime(start),
            endDate: this.parseDate(end),
            endTime: this.parseTime(end)
        });
        request.get(constants.API_URL + 'games').end((err,res) => {
            this.setState({gamesData: res.body});
        });
    }

    toggleSettings() {
        this.setState({ collapse: !this.state.collapse });
    }

    submitChanges(event) {
        event.preventDefault();
        const { name, game, tournament, registeredUsers } = this.state;
        const start = this.parseDateAndTime(this.state.startDate, this.state.startTime);
        const end = this.parseDateAndTime(this.state.endDate, this.state.endTime);
        let newData = {
            name: name,
            start: start,
            end: end,
            game: game,
            users: registeredUsers
        }
        request.put(constants.API_URL + 'tournaments/'+ tournament.id ).send(newData).set('accept', 'json').end((err, res) => {
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
        await this.setState({
            [name]: value,
        });
    }

    toggleDeleteTournament() {
        this.setState({
            deleteTournament: !this.state.deleteTournament
        });
    }

    parseDateAndTime(date, time) {
        return new Date(date + ' ' + time).toISOString();
    }

    parseDate(utcDate) {
        const date = new Date(utcDate);
        const year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        return year + '-' + month + '-' + day;
    }

    parseTime(utcDate) {
        const date = new Date(utcDate);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        return hours + ':' + minutes;
    }

    render() {
        const { tournament, collapse, name, startDate, startTime, endDate, endTime, gamesData, registeredUsers, deleteTournament, reload } = this.state;
        return (
            <ListGroupItem>
                <div>
                    <Row style={{ cursor: 'pointer' }} onClick={this.toggleSettings}>
                        <Col xs='1'>{tournament.id}</Col>
                        <Col>{name}</Col>
                        <Col xs='1'><Badge className='admin-accent-light' pill>{registeredUsers.length}</Badge></Col>
                    </Row>
                    <Collapse isOpen={collapse} style={{marginTop: '20px'}}>
                        <Form onSubmit={event => this.submitChanges(event)}>
                            <FormGroup>
                                <Input onChange={this.handleChange} type='text' name='name' id='name' value={name} placeholder='Tournament name' />
                            </FormGroup>
                            <FormGroup>
                                <Input type='select' name='game' id='game' value={tournament.game} onChange={this.handleChange} >
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
                            <Row> 
                                <Col className='text-left'><Button className='btn-sm btn-warning' onClick={this.toggleDeleteTournament}>Delete</Button></Col>
                                <Col className='text-right'><Button className='btn-sm btn-default'>Save</Button></Col>
                            </Row>
                        </Form>
                    </Collapse>
                </div>
                <DeleteTournament tournament={tournament} reload={reload} show={deleteTournament} toggle={this.toggleDeleteTournament} />
            </ListGroupItem>
        )
    }
}