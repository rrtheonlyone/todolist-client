import React, { Component } from 'react'
import {Container, Grid, Form, Input, Header, Icon, Button, Segment, Select } from 'semantic-ui-react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo'

import {withRouter} from 'react-router-dom'


class EditTodo extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      name: "",
      description: "",
      category_id: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.Item.refetch();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.Item.item) {
      this.setState({
        name: nextProps.Item.item.name,
        description: nextProps.Item.item.description,
        category_id: nextProps.Item.item.category.id
      })
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
      event.preventDefault();

      const {name, description, category_id} = this.state;
      const id = this.props.match.params.todo_id;

      this.props.mutate({variables: {id, name, description, category_id} })
      .then(() => {
        this.props.history.push('/')
      });
  }

  render() {
    const {Category} = this.props;

    return (
      <div>
          <br/>
          <Grid container>
            <Grid.Row centered textAlign="left">
              <Header size='large'><Icon name='write square' />Edit your Todo</Header>
            </Grid.Row>
            <br/>
            <Grid.Row centered>
              <Grid.Column width={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline width={10}>
                  <label>Name</label>
                  <Input placeholder='Give your todo a name' value={this.state.name} onChange={this.handleChange} name="name" />
                </Form.Field>

                <Form.Field inline>
                  <Form.TextArea label="Description" placeholder='Additional Details...' value={this.state.description} onChange={this.handleChange} name="description"/>
                </Form.Field>

                <Form.Field label='Category' control='select' onChange={this.handleChange} name="category_id" value={this.state.category_id}>
                  {Category.allCategories && Category.allCategories.map((data) => {return <option value={data.id} key={data.id}>{data.name}</option>})}
                </Form.Field>

                <br/>

                <Button type='submit'>Update</Button>
              </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

const updateTodoMutation = gql`
  mutation updateTodo($id: ID!, $name: String!, $description: String!, $category_id: ID!) {
    updateItem (id: $id, name: $name, description: $description, category_id: $category_id) {
      id 
      name
      description
    }
  }
`

const getTodoDetails = gql`
  query Item ($id: ID!) {
    item (id: $id) {
      name
      description
      category {
        id
      }
    }
  }
`;

const Categories = gql`
  query Categories {
    allCategories {
      id
      name
    }
  }
`;



export default compose(graphql(updateTodoMutation), 
                       graphql(getTodoDetails, {name: "Item", options: (ownProps) => ({ variables: {id: ownProps.match.params.todo_id} })}),
                       graphql(Categories, {name: "Category"}))
                       (withRouter(EditTodo));




