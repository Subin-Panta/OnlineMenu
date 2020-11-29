import React from 'react'

const SingleItem = props => {
	const a = props.match.params.name
	return <div>{a}</div>
}

export default SingleItem
