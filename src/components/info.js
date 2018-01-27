import React from 'react'

import { Header, Icon } from 'semantic-ui-react'

const Info = (props) => {
	
	return (
		<div>
			<Header as='h2'>
			    <Icon name='tasks' />
			    <Header.Content>
			      	Task Manager
			    </Header.Content>
		  	</Header>
		  	<p> Below are the tasks that you currently have. Create a new one above or filter below accordingly</p>
		</div>
	)


}

export default Info;