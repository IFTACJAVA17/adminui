import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import User from './user.component';
import * as request from 'superagent';
import * as constants from '../../constans';

const KEYS_TO_FILTERS = ['fullName', 'userName', 'id']

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            searchTerm: ''
        };
        this.searchUpdate = this.searchUpdate.bind(this);
    }

    componentWillMount(){
        request.get(constants.API_URL + 'users').end((err,res) => {
            if(err) { console.log(err.body); return }
            this.setState({usersData: res.body});
        });
    }

    searchUpdate (term) {
        this.setState({searchTerm: term})
    }

    render() {
        const { usersData, searchTerm } = this.state;
        const users = usersData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)).map(user => {
            return <User user={user} key={user.id} />
        });
        return (
            <div>
                <Row>
                    <Col><h1>Users</h1></Col>
                </Row>
                <Row>
                    <Col><SearchInput inputClassName='form-control search-input' onChange={this.searchUpdate} /></Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className='list-control'>{users}</ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}