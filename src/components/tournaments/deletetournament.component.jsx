import React, { Component } from 'react';
import { Row, Col, Button, ModalHeader, ModalBody, Modal, Form } from 'reactstrap';
import * as request from 'superagent';
import * as constants from '../../constans';

export default class DeleteTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: props.toggle,
            tournament: props.tournament,
            reload: props.reload
        }
    }

    submitDelete(event) {
        event.preventDefault();
        request.delete(constants.API_URL + 'tournaments/' + this.state.tournament.id).end((err, res) => {
            if (err) { console.log(err.body); return; }
            this.state.reload();
            this.state.toggle();
        });
    }

    render() {
        const { toggle, tournament } = this.state;
        return (
            <Modal isOpen={this.props.show} toggle={toggle}>
                <Form onSubmit={(e) => this.submitDelete(e)}>
                    <ModalHeader toggle={toggle}>Delete {tournament.name}</ModalHeader>
                    <ModalBody>
                        Your are about to delete {tournament.name}. This can not be undone. All data for this tournament will be deleted.
                        BE CAUTIOUS!!
                    </ModalBody>
                    <Row>
                        <Col xs={6} className='text-left'><Button className='btn btn-warning'>Delete</Button></Col>
                        <Col className='text-right'><Button color='btn btn-default' onClick={toggle}>Cancel</Button></Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
