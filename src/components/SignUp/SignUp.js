import React, { useEffect, useState } from 'react'
import classes from './SignUp.module.css'
import Spinner from '../UI/spinner/Spinner'
import axios from 'axios'
import WithErrorHandler from '../hoc/withErrorHandler/WithErrorHandler'
const SignUp = () => {
	const [data, setData] = useState({
		loading: true,
		users: []
	})
	useEffect(() => {
		console.log('infinite?')
		const fetch = async () => {
			try {
				const fetchedData = await axios.get('/auth/allUsers')
				if (fetchedData.status !== 200) {
					throw new Error('Server Busy')
				}
				setData({ ...data, loading: false, users: [...fetchedData.data.users] })
			} catch (error) {
				console.log(error)
				//wrapping in this because i need to handle error here even if it is being handeled by my HOC
			}
		}
		fetch()
	}, [])
	const deleteUser = async e => {
		alert('User is gonna be deleted.')

		//send axios request to backend and remove the user from local State
		try {
			const response = await axios.post('/auth/deleteUser', {
				id: e.target.name
			})
			if (response.status !== 200) {
				throw new Error('Server Busy')
			}
			const updatedUsers = data.users.filter(item => item._id !== e.target.name)
			setData({ ...data, loading: false, users: [...updatedUsers] })
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<div className={classes.container}>
				{/* HEYYY //loop here and display all users */}
				{data.loading ? (
					<Spinner />
				) : (
					data.users.map((user, index) => (
						<div
							className={classes.subContainer}
							key={index}
							style={{
								backgroundColor: user.verified
									? 'rgb(163, 247, 188)'
									: 'rgb(240, 130, 103)'
							}}
						>
							<div className={classes.adjacentContainer}>
								<div className={classes.name}>{user.name}</div>
								<div>{user.email}</div>
								<div>Status: {user.verified ? 'Verified' : 'Unverified'}</div>
							</div>
							<div className={classes.adjacentContainer2}>
								<button name={user._id} onClick={deleteUser}>
									Delete
								</button>
							</div>
						</div>
					))
				)}
			</div>
			<div className={classes.add}>Add New User</div>
		</div>
	)
}

export default WithErrorHandler(SignUp, axios)
