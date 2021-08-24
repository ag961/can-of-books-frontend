import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class BookForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    console.log(title, description);
    this.props.createBook(title, description);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label >Title</Form.Label>
          <Form.Control placeholder="Type in the title" />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Add your book descrition here</Form.Label>
          <Form.Control placeholder="Book description..." as="textarea" rows={3} />
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
          onClick={this.props.closeModal}
          variant="primary"
          type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withAuth0(BookForm);
