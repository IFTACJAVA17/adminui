import React, { Component } from 'react';
import { Button, ListGroupItem, Row, Col, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';
import DeleteGame from './deletegame.component';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game,
            collapse: false,
            gameName: props.game.name,
            gameDescription: props.game.desc,
            githubUrl: props.game.githubUrl,
            bannerUrl: props.game.bannerUrl,
            active: props.game.active,
            featured: props.game.featured,
            deleteGame: false,
            reload: props.reload
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleDeleteGame = this.toggleDeleteGame.bind(this);
    }

    toggleSettings() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleDeleteGame() {
        this.setState({
            deleteGame: !this.state.deleteGame
        });
    }

    submitChanges(event) {
        event.preventDefault();
        const { gameName, githubUrl, active, featured, gameDescription, bannerUrl } = this.state;
        let newData = {
            id: this.state.game.id,
            name: gameName,
            desc: gameDescription,
            githubUrl: githubUrl,
            bannerUrl: bannerUrl,
            active: active,
            featured: featured
        }
        request.put(constants.API_URL + 'games/'+ this.state.game.id ).send(newData).set('accept', 'json').end((err, res) => {
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

    render() {
        const { game, collapse, gameName, githubUrl, active, featured, gameDescription, bannerUrl, deleteGame, reload } = this.state;
        return (
            <ListGroupItem>
                <div>
                    <Row style={{ cursor: 'pointer' }} onClick={this.toggleSettings}>
                        <Col xs='1'>{game.id}</Col>
                        <Col>{gameName}</Col>
                        <Col xs='1'></Col>
                    </Row>
                    <Collapse isOpen={collapse}>
                        <Form onSubmit={event => this.submitChanges(event)}>
                            <FormGroup>
                                <Label for='gameName'>Game Name</Label>
                                <Input onChange={this.handleChange} type='text' name='gameName' id='gameName' value={gameName} placeholder='Game name' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='githubUrl'>Github URL</Label>
                                <Input onChange={this.handleChange} type='text' name='githubUrl' id='githubUrl' value={githubUrl} placeholder='http://Github URL' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='bannerUrl'>Banner URL</Label>
                                <Input onChange={this.handleChange} type='text' name='bannerUrl' id='bannerUrl' value={bannerUrl} placeholder='http://Banner URL' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='description'>Description</Label>
                                <Input onChange={this.handleChange} type='textarea' name='gameDescription' id='gameDescription' value={gameDescription} />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleChange} name='active' checked={active} type='checkbox' />{' '}Active
                                    </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleChange} name='featured' checked={featured} type='checkbox' />{' '}Featured
                                    </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row> 
                                <Col className='text-left'><Button className='btn-sm btn-warning' onClick={this.toggleDeleteGame}>Delete</Button></Col>
                                <Col className='text-right'><Button className='btn-sm btn-default' onClick={this.toggleSettings}>Cancel</Button><Button className='btn-sm btn-success'>Save</Button></Col>
                            </Row>
                        </Form>
                    </Collapse>
                </div>
                <DeleteGame game={game} reload={reload} show={deleteGame} toggle={this.toggleDeleteGame} />
            </ListGroupItem>
        )
    }
}