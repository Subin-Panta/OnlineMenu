import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addNew, deleteItem, editItem } from '../../../store/actions/index'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import Modal from '../../UI/Modal/Modal'
import Spinner from '../../UI/spinner/Spinner'
//import PropTypes from 'prop-types'
import classes from './EditingComponent.module.css'

const EditingComponent = ({ menu, addNew, deleteItem, editItem }) => {
	const [openModal, setOpenModal] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		image: '',
		ingredients: '',
		details: ''
	})
	const [editing, setEditing] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const deleteHandler = e => {
		//console.log(e.target.attributes.getNamedItem('data-id').value)
		const id = e.target.attributes.getNamedItem('data-id').value

		deleteItem(id)
	}
	useEffect(() => {
		if (openModal === false) {
			setEditing(false)
			setFormData({
				name: '',
				price: '',
				image: '',
				ingredients: '',
				details: ''
			})
		}
	}, [openModal])
	const itemRenderer = () => {
		return menu.items.map((item, index) => {
			return (
				<div className={classes.subContainer} key={index}>
					<div className={classes.name}>{item.name}</div>
					{/* <div className={classes.price}>{item.price}</div> */}
					<div className={classes.buttons}>
						<div
							className={classes.delete}
							data-id={item._id}
							onClick={deleteHandler}
						>
							Delete
						</div>{' '}
						<div
							className={classes.edit}
							data-id={item._id}
							onClick={editHandler}
						>
							Edit
						</div>
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

		const fdata = new FormData()
		fdata.append('name', formData.name)
		fdata.append('price', formData.price)
		fdata.append('image', formData.image)
		fdata.append('ingredients', formData.ingredients)
		fdata.append('details', formData.details)
		if (editing && editingId) {
			//console.log('Should Reach here')
			editItem(editingId, fdata)
		} else {
			addNew(fdata)
		}
		trigger()

		//check whether editing if false or true if true call editing() in redux action
	}
	const changeHandler = e => {
	//	console.log(e.target.name)
		if (e.target.name === 'image') {
			setFormData({ ...formData, [e.target.name]: e.target.files[0] })
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value })
		}
	}

	const editHandler = e => {
		//setEditing to true
		setEditing(true)
		const id = e.target.attributes.getNamedItem('data-id').value
		//first get item info from redux using the above Id
		const oldData = menu.items.filter(item => item._id === id)
		//setFormData() and set the old value
		setFormData({
			...formData,
			name: oldData[0].name,
			price: oldData[0].price,
			image: oldData[0].image,
			ingredients: oldData[0].ingredients,
			details: oldData[0].details
		})
		setEditingId(id)
		//openModal
		trigger()
	}

	const modalContents = () => (
		<div>
			<form
				className={classes.form}
				onSubmit={submitHandler}
				encType='multipart/form-data'
			>
				<input
					required={!editing}
					type='text'
					name='name'
					minLength='2'
					placeholder='Name'
					onChange={changeHandler}
					value={formData.name}
				/>
				<input
					required={!editing}
					type='text'
					name='price'
					placeholder='Price'
					onChange={changeHandler}
					value={formData.price}
				/>
				<textarea
					required={!editing}
					rows='10'
					name='details'
					minLength='10'
					placeholder='Details'
					onChange={changeHandler}
					value={formData.details}
				/>
				<input
					required={!editing}
					type='text'
					name='ingredients'
					placeholder='Ingredients (enter ingredients seperated by comma)'
					onChange={changeHandler}
					value={formData.ingredients}
				/>
				<label htmlFor='file-upload' className={classes.customFileUpload}>
					Add Image
				</label>
				<input
					id='file-upload'
					required={!editing}
					type='file'
					name='image'
					placeholder='Add Image'
					onChange={changeHandler}
					// value={formData.image}
				/>

				<input type='submit' />
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
export default WithErrorHandler(
	connect(mapStateToProps, { addNew, deleteItem, editItem })(EditingComponent),
	axios
)
//neer error Handling HOC
