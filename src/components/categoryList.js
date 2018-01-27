import React from 'react'

import { Menu, Icon } from 'semantic-ui-react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CategoryList extends React.Component {
	render() { 
		const {data} = this.props;

		return (
			<Menu compact stackable>
	    		<Menu.Item as='a' href="/">Inbox</Menu.Item>
	    		{data.allCategories && data.allCategories.map((data) => {return <Menu.Item as ='a' href={"/category/" + data.id} key={data.id}>{data.name}</Menu.Item>})}
		    	<Menu.Item as='a' href="/create/category"><Icon name='book' />Add a new category</Menu.Item>
  	 		</Menu>
		)
	}
}

const Categories = gql`
  query Categories {
    allCategories {
      id
      name
    }
  }
`;

export default graphql(Categories)(CategoryList);

