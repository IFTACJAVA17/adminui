import React, { Component } from 'react';
import { Row, Col, ListGroup, Button } from 'reactstrap';
import Tournament from './tournament.component';
import SearchInput, {createFilter} from 'react-search-input';
import * as request from 'superagent';
import * as constants from '../../constans';
import CreateTournament from './createtournament.component';

const KEYS_TO_FILTERS = ['name']

export default class Tournaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournamentsData: [],
            searchTerm: '',
            createTournament: false
        };
        this.searchUpdate = this.searchUpdate.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.toggleCreateTournament = this.toggleCreateTournament.bind(this);
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        request.get(constants.API_URL + 'tournaments').end((err, res) => {
            if (err) { console.log(err.body); return; }
            this.setState({tournamentsData: res.body});
        });
    }

    toggleCreateTournament() {
        this.setState({
            createTournament: !this.state.createTournament
        });
    }

    searchUpdate (term) {
        this.setState({searchTerm: term})
    }

    render() {
        const { tournamentsData, searchTerm, createTournament } = this.state;
        const tournaments = tournamentsData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)).map(tournament => {
            return <Tournament tournament={tournament} reload={this.fetchData} key={tournament.id}/>;
        });
        return (
            <div>
                <Row><Col><h1>Tournaments</h1></Col></Row>
                <Row><Col><Button className='btn' onClick={this.toggleCreateTournament}>Create</Button></Col></Row>
                <Row>
                    <Col><SearchInput inputClassName='form-control search-input' onChange={this.searchUpdate} /></Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className='list-control'>{tournaments}</ListGroup>
                    </Col>
                </Row>
                <CreateTournament show={createTournament} reload={this.fetchData} toggle={this.toggleCreateTournament} />
            </div>
        )
    }
}