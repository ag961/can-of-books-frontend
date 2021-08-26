import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';

class BookFormUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.selectedBook._id,
      title: this.props.selectedBook.title,
      description: this.props.selectedBook.description,
      status: this.props.selectedBook.status,
      email:this.props.auth0.user.email
    }
  }

  handleTitle = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });    
  }

  handleDescription = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });    
  }

  handleSubmitUpdate = (e) => {
    e.preventDefault();    
    this.props.updateBook(this.state);
    this.props.closeModal();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmitUpdate}>
        <Form.Group controlId="title">
          <Form.Label >Title</Form.Label>
          <Form.Control value={this.state.title} onChange={this.handleTitle} />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Add the descrition</Form.Label>
          <Form.Control value={this.state.description} onChange={this.handleDescription} as="textarea" rows={3} />
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Status
            </Form.Label>
            <Col >
              <Form.Check
                disabled
                type="radio"
                label="Favorite"
                id="disabled-default-radio"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Button
          variant="primary"
          type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withAuth0(BookFormUpdate);
