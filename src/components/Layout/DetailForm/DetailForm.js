import React, { useState } from 'react'
import classes from './Detail.module.css'
const DetailForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		address: '',
		phoneNo: '',
		additionalDetails: '',
		gpsValue: {
			longitude: '',
			latitude: ''
		}
	})

	const submitHandler = e => {
		e.preventDefault()
		console.log('here MF')
		//submit to backend and generate a invoice and pass invoice back to client
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

export default DetailForm
