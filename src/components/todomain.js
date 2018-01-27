import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Container, Form, Input } from 'semantic-ui-react'

import Info from './info'
import CategoryList from './categoryList'
import Todo from './todoCard'
import FilteredTodo from './filteredTodoCard'

class TodoMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: false
    };
  }

  componentWillMount() {
    if (this.props.match.params.category_id) {
      this.setState({
        filter: true
      });
    }
  }

  render() {
    return (
      <div>
        <Segment>
          <Container>
            <Grid stackable>
              <Grid.Row>
                <Info/>
              </Grid.Row>

              <Grid.Row>
                <CategoryList/>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Container>
          <Grid.Row>
            <Form>
              <Form.Field inline>
                <label>Search for a task</label>
                <Input placeholder='search' />
              </Form.Field>
            </Form>
          </Grid.Row>
        </Container>

        <br/><br/>

        {!this.state.filter && <Todo/>}
        {this.state.filter && <FilteredTodo id={this.props.match.params.category_id}/>}

      </div>
    )
  }
}

export default TodoMain