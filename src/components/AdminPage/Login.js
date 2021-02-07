import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Login.module.css'
import { verifyUser } from '../../store/actions/auth'
const Login = ({ verifyUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const submitHandler = async e => {
		e.preventDefault()
		const lowercased = formData.email.toLowerCase()
		const email = lowercased
		const password = formData.password
		verifyUser(email, password)
		//send it to back end to verify with redux and store user data on redux state
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

export default connect(null, { verifyUser })(Login)
