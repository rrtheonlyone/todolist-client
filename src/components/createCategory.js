import React, { Component } from 'react'
import {Container, Grid, Form, Input, Header, Icon, Button, Segment } from 'semantic-ui-react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {withRouter} from 'react-router-dom'


class CreateCategory extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      name: ""
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
      console.log(this.state);

      const {name} = this.state;

      this.props.mutate({variables: {name} })
      .then(() => {
        this.props.history.push('/')
      });
  }

  render() {
    return (
      <div>
          <br/>
          <Grid container>
            <Grid.Row centered textAlign="left">
              <Header size='large'><Icon name='book' />Add a New Category</Header>
            </Grid.Row>
            <br/>
            <Grid.Row centered>
              <Grid.Column width={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline width={10}>
                  <label>Name</label>
                  <Input placeholder='Give your category a name' onChange={this.handleChange} name="name" />
                </Form.Field>

                <Button type='submit'>Add</Button>
              </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

const createCategoryMutation = gql`
  mutation createCatogory($name: String!) {
    createCatogory (name: $name) {
      id 
      name
    }
  }
`

export default graphql(createCategoryMutation)(withRouter(CreateCategory));