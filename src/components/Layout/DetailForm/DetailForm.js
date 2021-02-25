import React, { useState } from 'react'
import classes from './Detail.module.css'
import axios from 'axios'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
const DetailForm = ({ order }) => {
	const history = useHistory()
	const [formData, setFormData] = useState({
		name: '',
		address: '',
		phoneNo: '',
		additionalDetails: ''
	})

	const submitHandler = async e => {
		e.preventDefault()
		//Better to use this in Redux
		try {
			const formDataOrder = {
				...formData,
				order: {
					...order.itemCount
				}
			}
			console.log(formDataOrder)
			//forcing response to be recieved in a blob format
			const response = await axios.post('/api/order/generateOrder', formDataOrder, {
				responseType: 'blob'
			})

			history.push('/')
			//opening new tab in window
			//Create a Blob from the PDF Stream
			const file = new Blob([response.data], { type: 'application/pdf' })
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file)
			//Open the URL on new Window
			const pdfWindow = window.open()
			pdfWindow.location.href = fileURL
		} catch (error) {
			console.log(error)
			//dont really need this though hamro Hoc Error Handler le kaam garcha
		}
	}
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	return (
		<div className={classes.cform}>
			<div className={classes.container}>
				<h3>Enter Your Details</h3>
				<form className={classes.form} onSubmit={e => submitHandler(e)}>
					<input
						name='name'
						type='text'
						placeholder='Full Name'
						value={formData.name}
						onChange={changeHandler}
						required
					/>
					<input
						type='text'
						name='address'
						placeholder='Address'
						value={formData.address}
						onChange={changeHandler}
						required
					/>

					<input
						type='text'
						name='phoneNo'
						placeholder='Phone Number'
						value={formData.phoneNo}
						onChange={changeHandler}
						required
					/>
					<textarea
						name='additionalDetails'
						placeholder='Additional Details'
						value={formData.additionalDetails}
						onChange={changeHandler}
					/>
					<input type='submit' value='Submit' onChange={changeHandler} />
				</form>
			</div>
		</div>
	)
}
const mapStateToProps = state => ({
	order: state.orderBuilder
})
export default WithErrorHandler(connect(mapStateToProps)(DetailForm), axios)
