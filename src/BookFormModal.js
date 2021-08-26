import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BookForm from './BookForm';
import BookFormUpdate from './BookFormUpdate';

class BookFormModal extends React.Component {



  render() {
    return (
      <Modal show={this.props.modalVisible} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            {this.props.updating
              ? "Update book details"
              : "Fill out the form to add a new book to your favorites!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.updating
            ? <BookFormUpdate
              closeModal={this.props.closeModal}
              updateBook={this.props.updateBook}
              selectedBook={this.props.selectedBook}
            />
            : <BookForm
              createBook={this.props.createBook}
              closeModal={this.props.closeModal}
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default withAuth0(BookFormModal);
