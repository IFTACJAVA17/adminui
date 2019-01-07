import React, { Component } from 'react';
import { Row, Col, ListGroup, Button } from 'reactstrap';
import Game from './game.component.jsx';
import SearchInput, { createFilter } from 'react-search-input';
import AddGame from './addgame.component';
import * as request from 'superagent';
import * as constants from '../../constans';

const KEYS_TO_FILTERS = ['name', 'desc']

export default class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gamesData: [],
            searchTerm: '',
            addGame: false
        };
        this.searchUpdate = this.searchUpdate.bind(this);
        this.toggleAddGame = this.toggleAddGame.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData(){
        request.get(constants.API_URL + 'games').end((err, res) => {
            if(err) { console.log(err.body); return }
            this.setState({ 
                gamesData: res.body,
                nextId: res.body.length + 1
             });
        })
    }

    searchUpdate(term) {
        this.setState({ searchTerm: term });
    }

    toggleAddGame() {
        this.setState({
            addGame: !this.state.addGame
        });
    }

    render() {
        const { gamesData, searchTerm, addGame } = this.state;
        const games = gamesData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)).map(game => {
            return <Game game={game} reload={this.fetchData} key={game.id} />
        });
        return (
            <div>
                <Row><Col><h1>Games</h1></Col></Row>
                <Row><Col><Button className='btn' onClick={this.toggleAddGame}>Add Game</Button></Col></Row>
                <Row>
                    <Col><SearchInput inputClassName='form-control search-input' onChange={this.searchUpdate} /></Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className='list-control'>{games}</ListGroup>
                    </Col>
                </Row>
                <AddGame show={addGame} reload={this.fetchData} toggle={this.toggleAddGame} />
            </div>
        )
    }
}