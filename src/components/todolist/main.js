import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './todo'

class TodoList extends Component {
	render () {

		const {data} = this.props;

		return (
			<div>
				<h2>TodoList comes here</h2><hr/>
				{data.allItems &&<Todo data={data.allItems}/>}
			</div>
		)
	}
}

// We use the gql tag to parse our query string into a query document
const Items = gql`
  query Items {
    allItems {
      id
      name
      description
      category {
      	name
      }
    }
  }
`;

export default graphql(Items)(TodoList);