import React, { Component } from 'react'
import {Container, Grid, Form, Input, Header, Icon, Button, Segment, Select } from 'semantic-ui-react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo'

import {withRouter} from 'react-router-dom'


class CreateTodo extends Component {

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

      this.props.mutate({variables: {name, description, category_id} })
      .then(() => {
        this.props.history.push('/')
      });
  }

  render() {
    const {data} = this.props;

    return (
      <div>
          <br/>
          <Grid container>
            <Grid.Row centered textAlign="left">
              <Header size='large'><Icon name='sticky note' />Create a New Todo</Header>
            </Grid.Row>
            <br/>
            <Grid.Row centered>
              <Grid.Column width={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline width={10}>
                  <label>Name</label>
                  <Input placeholder='Give your todo a name' onChange={this.handleChange} name="name" />
                </Form.Field>

                <Form.Field inline>
                  <Form.TextArea label="Description" placeholder='Additional Details...' onChange={this.handleChange} name="description"/>
                </Form.Field>

                <Form.Field label='Category' control='select' onChange={this.handleChange} name="category_id">
                  {data.allCategories && data.allCategories.map((data) => {return <option value={data.id}>{data.name}</option>})}
                </Form.Field>

                <br/>

                <Button type='submit'>Create</Button>
              </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

const createTodoMutation = gql`
  mutation createTodo($name: String!, $description: String!, $category_id: ID!) {
    createItem (name: $name, description: $description, category_id: $category_id) {
      id 
      name
      description
    }
  }
`

const Categories = gql`
  query Categories {
    allCategories {
      id
      name
    }
  }
`;



export default compose(graphql(createTodoMutation), graphql(Categories))(withRouter(CreateTodo));




