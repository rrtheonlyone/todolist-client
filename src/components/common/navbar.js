import React from 'react'

import { Menu, Icon, Container, Button } from 'semantic-ui-react'

const NavBar = (props) => {
	return (
		 <Menu size='large' inverted stackable>
		    <Container>
		      <Menu.Item as='a' href="/" header><Icon name='calendar' />To Do List</Menu.Item>
		      <Menu.Menu position='right'>
		        <Menu.Item className='item'>
		          <Button as='a'>Help</Button>
		        </Menu.Item>
		        <Menu.Item>
		          <Button as='a' href="/create/todo" primary>Create a new todo</Button>
		        </Menu.Item>
		      </Menu.Menu>
		    </Container>
		  </Menu>
	)

}

export default NavBar;