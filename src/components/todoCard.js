import React, { Component } from 'react'
import {Card, Icon, Button, Container, Grid } from 'semantic-ui-react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo'

import {Link} from 'react-router-dom'

import {withRouter} from 'react-router-dom'

class Todo extends Component {

  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(event) {
    console.log(event.target.id);

    const id = event.target.id;

    this.props.mutate({variables: {id} })
      .then(() => {
        console.log("DONE");
        window.location.reload();
      });
  }

  render() {

    const {data} = this.props;

    const TodoCard = (info) => {
      
      return (
        <Grid.Column width = {5}>
          <Card>
            <Card.Content header>
              <h4>{info.detail.name}</h4>
              <p><Icon name='tag' /><u>{info.detail.category.name}</u></p>
            </Card.Content>

            <Card.Content description={info.detail.description} />
            <Card.Content extra>
              <Button.Group>
                <Link to={"/todo/" + info.detail.id}><Button icon='pencil' color='blue'/></Link>
                <Button icon='checkmark' color='green'/>
                <Button color='red' id={info.detail.id} onClick={this.deleteItem} icon>
                  <Icon name='trash' id={info.detail.id} onClick={this.deleteItem} />
                </Button>
              </Button.Group>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    }

    return (
      <div>
          <Grid container stackable>
            {data.allItems && data.allItems.map((data) => {return <TodoCard detail={data} key={data.id}/>})}
          </Grid>
      </div>
    )
  }
}

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

const deleteItem = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

export default compose(graphql(Items), graphql(deleteItem))(withRouter(Todo));