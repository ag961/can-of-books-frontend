import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './Book.css';


class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render() {
    let booksToRender = this.state.data.map((book, index) => (
      <Carousel.Item
        key={index}>
        <img
          className=".d-block w-100"
          src="https://www.publicdomainpictures.net/pictures/260000/velka/abstract-background-books.jpg"
          alt="slide"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    return (
      <Container >
        <Carousel id="carousel" >
          {booksToRender}
        </Carousel>
      </Container>

    )
  }
}

export default Book;
