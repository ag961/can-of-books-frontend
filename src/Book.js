import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


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
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    return (
      <Container>
        <Carousel variant="dark">
          {booksToRender}
        </Carousel>
      </Container>

    )
  }
}

export default Book;
