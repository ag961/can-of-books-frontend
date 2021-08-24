import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksToRender: [],
      modalVisible: false,
    }
  }

  componentDidMount = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email },
    };
    try {
      const booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books`, config);
      console.log('it worked');
      this.setState({
        booksToRender: booksData.data
      });
      console.log(this.state.booksToRender);
    } catch (error) {
      console.log('Authenitcation error', error);
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  createBook = async (title, description) => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log('create book jwt', jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      params: {
        "title": title,
        "description": description,
        "status": "favorite",
        "email": this.props.auth0.user.email
      }
    };
    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, config);
      let createdBookData = response.data;
      console.log('newly added book: ', createdBookData);
      this.setState({
        booksToRender: [...this.state.booksToRender, createdBookData]
      })
    } catch (error) {
      console.log('Authenitcation error', error.message);
    };
  }

  handleDelete = async (id) => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log('delete book jwt', jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email }
    };
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`, config)
      let remainingBooks = this.state.booksToRender.filter(book => book._id !== id);
      this.setState({
        booksToRender: remainingBooks
      })
      console.log(this.state.booksToRender);
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    let booksData = this.state.booksToRender.map((book) => (
      <Carousel.Item
        key={book._id}>
        <img
          className=".d-block w-100"
          src="https://www.publicdomainpictures.net/pictures/260000/velka/abstract-background-books.jpg"
          alt="slide"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <Button variant="danger" onClick={() => this.handleDelete(book._id)}>Delete</Button>
        </Carousel.Caption>
      </Carousel.Item>
    ))
    return (
      <>
        <Jumbotron id="jumbotron">
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {this.state.booksToRender.length !== 0 ?
            <Container >
              <Carousel id="carousel" >
                {booksData}
              </Carousel>
            </Container>
            : ''}
          <button onClick={this.showModal}>Add new book
          </button>
        </Jumbotron>
        <BookFormModal
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          createBook={this.createBook}
        />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
