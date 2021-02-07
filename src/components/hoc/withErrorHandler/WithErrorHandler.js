import React, { useState, useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
const WithErrorHandler = (WrappedComponent, axios) => {
	const NewComponent = props => {
		console.log('UseState')
		const [ready, setReady] = useState(false)
		const [error, setError] = useState(null)
		console.log('runs')
		useEffect(() => {
			const req = axios.interceptors.request.use(config => {
				console.log('request intercepted')
				return config
			})
			const res = axios.interceptors.response.use(null, error => {
				setError(error)
				return Promise.reject(error)
			})
			setReady(true)
			return () => {
				axios.interceptors.request.eject(req)
				axios.interceptors.response.eject(res)
			}
		}, [])
		if (!ready) return null
		return (
			<div>
				{console.log('render')}
				{error ? (
					<Modal clickHandler={() => setError(null)}> {error.message}</Modal>
				) : null}
				<WrappedComponent {...props} />
			</div>
		)
	}
	return NewComponent
}
export default WithErrorHandler

// import React, { Component } from 'react'
// import Modal from '../../UI/Modal/Modal'
// const WithErrorHandler = (WrappedComponent, axios) => {
// 	return class extends Component {
// 		state = {
// 			error: null
// 		}

// 		componentDidMount() {
// 			console.log('component did Moint')
// 			this.reqinter = axios.interceptors.request.use(req => {
// 				console.log('clearing error', this.state.error)
// 				this.setState({ error: null })
// 			})
// 			this.resinter = axios.interceptors.response.use(null, error => {
// 				this.setState({ error: error })
// 				console.log('called as error is present', this.state.error)
// 			})
// 		}
// 		componentWillUnmount() {
// 			axios.interceptors.request.eject(this.reqinter)
// 			axios.interceptors.response.eject(this.resinter)
// 		}
// 		render() {
// 			return (
// 				<div>
// 					{console.log('called First')}
// 					{this.state.error ? (
// 						<Modal clickHandler={() => this.setState({ error: null })}>
// 							{this.state.error.message}
// 						</Modal>
// 					) : null}
// 					<WrappedComponent {...this.props} />
// 				</div>
// 			)
// 		}
// 	}
// }
// export default WithErrorHandler
