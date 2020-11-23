import React, { Fragment, useState } from 'react'
import Menu from '../Layout/Menu/Menu'
import Receipt from '../Layout/Receipt/Receipt'
import ReceiptButton from '../UI/ReceiptButton/ReceiptButton'
import classes from './Home.module.css'
import { connect } from 'react-redux'
import Modal from '../UI/Modal/Modal'
import { Link } from 'react-router-dom'
const Home = ({ order }) => {
	const [openModal, setOpenModal] = useState(false)
	const clickHandler = () => {
		setOpenModal(!openModal)
	}
	const modalContents = (itemCount, itemPrice) => {
		return (
			<Modal clickHandler={clickHandler}>
				{/* //better if i get prices from backend and total also from backend */}
				<h2>Please Check Your Order and Confirm it</h2>
				<ul>
					{Object.keys(itemCount).map((item, index) => (
						<li key={index} style={{ padding: '5px', margin: 'auto' }}>
							{item} : {itemCount[item]} -- {itemPrice[item]}
						</li>
					))}
				</ul>
				<h2>
					Total :{' '}
					{Object.values(itemPrice).reduce((total, amount) => +total + +amount)}
				</h2>
				<Link className={classes.linkStyle} to='/checkout'>
					Confirm Order
				</Link>
			</Modal>
		)
	}
	return (
		<Fragment>
			<div className={classes.container}>
				<div className={classes.menu}>
					<Menu />
				</div>
				<div className={classes.receipt}>
					<Receipt />
				</div>
			</div>
			{Object.keys(order.itemCount).length > 0 ? (
				<div className={classes.receiptButton}>
					<ReceiptButton clickHandler={clickHandler} />
				</div>
			) : null}
			{openModal ? modalContents(order.itemCount, order.itemPrice) : null}
		</Fragment>
	)
}
const mapStateToProps = state => ({ order: state.orderBuilder })
export default connect(mapStateToProps)(Home)
