import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import NavBar from './components/common/navbar'
import TodoMain from './components/todomain'
import CreateTodo from './components/createTodo'
import CreateCategory from './components/createCategory'
import EditTodo from './components/editTodo'

import { Router, Route, Link } from 'react-router-dom'
import history from './history';

const client = new ApolloClient({
  link: new HttpLink({uri: "https://evening-waters-26594.herokuapp.com/graphql"}),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <div>
            <NavBar/>
            <Route exact path="/" component={TodoMain} />
            <Route path="/create/todo" component={CreateTodo} />
            <Route path="/create/category" component={CreateCategory} />
            <Route path="/todo/:todo_id" component={EditTodo} />
            <Route path="/category/:category_id" component={TodoMain} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
