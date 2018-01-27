import React from 'react'
import {Panel, Col, Row, Button, Glyphicon} from 'react-bootstrap'

const Todo = (props) => {
	const {data} = props;

	const PanelItem = (info) => {
		console.log(info);
			return (
				<Row>
					<Col sm={4} smOffset={4}>
						<Panel>
							<h4>{info["detail"].name}</h4>
							{info["detail"].category && <p>Category: {info["detail"].category.name} </p>}
							<p>Created on: </p>
							<p>View    Edit    Destroy</p>
						</Panel>
					</Col>
				</Row>
			)
	} 

	return (
		<div>
			{data.map((data) => {return <PanelItem detail={data} key={data.id}/>})}
		</div>
	)
}



export default Todo;

