import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {

  makeRequest = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    };

    const serverResponse = await axios.get(`${process.env.REACT_APP_SERVER}/test`, config);
    console.log('it worked', serverResponse);
  }

  render() {
    const { user } = this.props.auth0;


    return (
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
    )
  }
}

export default withAuth0(MyFavoriteBooks);
