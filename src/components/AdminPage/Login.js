import React, { useState } from 'react'
import axios from 'axios'
import classes from './Login.module.css'
import WithErrorHandler from '../hoc/withErrorHandler/WithErrorHandler'
const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const submitHandler = async e => {
		e.preventDefault()
		const lowercased = formData.email.toLowerCase()
		const formD = {
			email: lowercased,
			password: formData.password
		}
		try {
			const res = await axios.post('/auth/postLogin', formD)
		} catch (error) {}

		//send it to back end to verify
	}
	const changeHandler = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
		//before sending convert email adrress to lowercase
	}
	return (
		<div className={classes.box}>
			<h3> Login as Admin</h3>
			<hr />
			<form onSubmit={submitHandler}>
				<input
					type='email'
					name='email'
					placeholder='Enter Your Email Address'
					required
					value={formData.email}
					onChange={changeHandler}
				/>
				<input
					type='password'
					name='password'
					placeholder='Enter Your password'
					required
					value={formData.password}
					onChange={changeHandler}
				/>
				<input type='submit' value='Submit' />
			</form>
		</div>
	)
}

export default WithErrorHandler(Login, axios)
