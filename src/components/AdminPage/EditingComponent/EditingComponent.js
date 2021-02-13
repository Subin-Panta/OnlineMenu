import React, { useState } from 'react'
import { connect } from 'react-redux'
import Modal from '../../UI/Modal/Modal'
import Spinner from '../../UI/spinner/Spinner'
//import PropTypes from 'prop-types'
import classes from './EditingComponent.module.css'

const EditingComponent = ({ menu }) => {
	const [openModal, setOpenModal] = useState(false)
	const [formData, setFormData] = useState({
		name: null,
		price: null,
		image: null,
		details: null
	})
	const itemRenderer = () => {
		console.log(menu)
		return menu.items.map((item, index) => {
			return (
				<div className={classes.subContainer} key={index}>
					<div className={classes.name}>{item.name}</div>
					{/* <div className={classes.price}>{item.price}</div> */}
					<div className={classes.buttons}>
						<div className={classes.delete}>Delete</div>{' '}
						{/*Fire redux action that sends request to backend to delete a item based on its name  and update State in redux of menu.items*/}
						<div className={classes.edit}>Edit</div>
						{/*OPen Modal where you would have a form that is filled with well details of the item and submit would update it in the backend   and update State in redux of menu.items */}
					</div>
				</div>
			)
		})
	}
	const trigger = () => {
		setOpenModal(!openModal)
	}
	const submitHandler = e => {
		e.preventDefault()
	}
	const modalContents = () => (
		<div>
			<form className={classes.form} enctype='multipart/form-data'>
				<input type='text' name='Name' placeholder='Name' />
				<input type='text' name='Price' placeholder='Price' />
				<textarea rows='10' name='Details' placeholder='details' />
				<input type='file' name='image' />
				<input type='submit' onSubmit={submitHandler} />
			</form>
		</div>
	)
	return (
		<div className={classes.container}>
			<h1 className={classes.header}>Edit Menu</h1>
			{menu.loading ? <Spinner /> : itemRenderer()}
			<button className={classes.add} onClick={trigger}>
				{' '}
				Add New
			</button>

			{!openModal ? null : (
				<Modal clickHandler={trigger}>{modalContents()}</Modal>
			)}
			{/*OPen Modal where you would have a form on sumbit sends a request to backend and update State in redux of menu.items */}
		</div>
	)
}

// EditingComponent.propTypes = {}
const mapStateToProps = state => ({
	menu: state.menuBuilder
})
export default connect(mapStateToProps)(EditingComponent)
