import React, { useRef, useState, useEffect } from 'react'
import classes from './SignUpForm.module.css'
import axios from 'axios'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import { useHistory } from 'react-router-dom'
const SignUpForm = () => {
	const history = useHistory()
	const [formData, setFormdata] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const inputFocus = useRef(null)
	useEffect(() => {
		inputFocus.current.focus()
		inputFocus.current.scrollIntoView({
			behavior: 'smooth'
		})
	}, [])

	const changeHandler = e => {
		setFormdata({ ...formData, [e.target.name]: e.target.value })
	}
	const submitHandler = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('/api/auth/', formData)
			if (response.status !== 201) {
				console.log(response.status)
				throw new Error('Server Busy')
			}
			setFormdata({
				...formData,
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			})
			history.go(0)
			//Update State
		} catch (error) {
			console.log(error)
			//Here error is handled by our HOC
		}
	}
	return (
		<div className={classes.biggerContainer}>
			<form className={classes.container} onSubmit={submitHandler}>
				<input
					name='name'
					placeholder='Name'
					type='text'
					onChange={changeHandler}
					required
					value={formData.name}
					ref={inputFocus}
				/>

				<input
					name='email'
					placeholder='Email'
					type='email'
					onChange={changeHandler}
					required
					value={formData.email}
				/>
				<input
					name='password'
					placeholder='Password'
					type='password'
					onChange={changeHandler}
					minLength='6'
					required
					value={formData.password}
				/>
				<input
					name='confirmPassword'
					placeholder='Confirm Password'
					type='password'
					onChange={changeHandler}
					minLength='6'
					required
					value={formData.confirmPassword}
				/>
				<input type='Submit' value='Submit' onChange={changeHandler} />
			</form>
		</div>
	)
}

export default WithErrorHandler(SignUpForm, axios)
