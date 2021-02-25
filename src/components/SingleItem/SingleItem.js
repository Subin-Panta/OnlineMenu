import React, { Fragment, useEffect, useState } from 'react'
import classes from './SingleItem.module.css'
import { initMenu } from '../../store/actions/index'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../UI/spinner/Spinner'
const SingleItem = ({ match, menu, initMenu }) => {
	const [item, setItem] = useState([])
	const a = match.params.name
	useEffect(() => {
		if (!menu.items) {
			initMenu()
		}
	}, [initMenu, menu.items])
	useEffect(() => {
		if (!menu.loading && !menu.error) {
			const newData = menu.items.filter((object, index) => {
				return object.name === a
			})
		
			setItem(newData)
		}
	}, [menu.loading, menu.error, menu.items, a])
	const comp = item => (
		<Fragment>
			<div className={classes.imageContainer}>
				<div className={classes.overlay}>
					<div className={classes.list}>
						<h1>Ingredients</h1>
						<ul>
							{item.ingredients.map((item, index) => {
								return <li key={index}>{item}</li>
							})}
						</ul>
						<span>Rs {item.price}</span>
					</div>
				</div>
				<img src={'/' + item.imageUrl} alt='' />
			</div>
			<span className={classes.details}>{item.details}</span>
			<div className={classes.button}>
				<Link to='/' className={classes.price}>
					Menu
				</Link>
			</div>
		</Fragment>
	)
	return (
		<div className={classes.container}>
			<h1>{a}</h1>
			{!(item.length > 0) ? <Spinner /> : comp(item[0])}
		</div>
	)
}
const mapStateToProps = state => ({
	menu: state.menuBuilder
})
export default connect(mapStateToProps, { initMenu })(SingleItem)
