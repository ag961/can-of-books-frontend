import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Book from './Book';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksToRender: []
    }
  }

  makeRequest = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    };
    try {
      const serverResponse = await axios.get(`${process.env.REACT_APP_SERVER}/test`, config);
      console.log('it worked', serverResponse);
      this.getBooks();
    } catch (error) {
      console.log('Authenitcation error', error)
    }
  }

  getBooks = async () => {
    const booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    console.log('These are the books in database:', booksData);
    this.setState({
      booksToRender: booksData.data
    })
    console.log('Books in state:', this.state.booksToRender);
  }

  render() {
    const { user } = this.props.auth0;

    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {user ?
            <button onClick={this.makeRequest}>Make Request to Server</button>
            : ''
          }
        </Jumbotron>
        {this.state.booksToRender.length !== 0 ?
          <Book
            data={this.state.booksToRender}
          />
          : ''
        }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
