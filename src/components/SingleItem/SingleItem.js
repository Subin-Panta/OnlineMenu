import React, { useEffect, useState } from 'react'
import classes from './SingleItem.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
const SingleItem = props => {
	const [item, setItem] = useState([])
	useEffect(() => {
		const data = async () => {
			const response = await axios.get(`/menu/item/${a}`)
			setItem(...response.data.item)
		}
		data()
		console.log(item)
	}, [])
	const a = props.match.params.name

	return (
		<div className={classes.container}>
			<h1>{a}</h1>
			<span className={classes.details}>{item.details}</span>
			<div className={classes.button}>
				<Link to='/' className={classes.price}>
					Rs {item.price}
				</Link>
			</div>
		</div>
	)
}

export default SingleItem
