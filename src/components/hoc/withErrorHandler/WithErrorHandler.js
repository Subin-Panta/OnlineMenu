import React, { Fragment, useEffect, useState } from 'react'
import Modal from '../../UI/Modal/Modal'
const Callingfunction = axios => {
	const [error, setError] = useState(null)
	const [modal, openModal] = useState(false)
	useEffect(() => {
		const req = axios.interceptors.request.use(null, error => {
			setError(null)
		})
		const res = axios.interceptors.response.use(null, error => {
			setError(error)
		})
		return () => {
			axios.interceptors.request.eject(req)
			axios.interceptors.response.eject(res)
		}
	}, [axios.interceptors.request, axios.interceptors.response])

	if (error) {
		return <Modal clickHandler={() => setError(null)}>{error.message}</Modal>
	}
}
const WithErrorHandler = (WrappedComponent, axios) => {
	return props => {
		return (
			<Fragment>
				{Callingfunction(axios)}
				<WrappedComponent {...props} />
			</Fragment>
		)
	}
}
export default WithErrorHandler

// import React, { Component } from 'react'
// import Modal from '../../UI/Modal/Modal'
// const withErrorHandler = (WrappedComponent, axios) => {
// 	return class extends Component {
// 		state = {
// 			error: null
// 		}
// 		componentDidMount() {
// 			this.reqinter = axios.interceptors.request.use(req => {
// 				this.setState({ error: null })
// 			})
// 			this.resinter = axios.interceptors.response.use(null, error => {
// 				this.setState({ error: error })
// 			})
// 		}
// 		componentWillUnmount() {
// 			axios.interceptors.request.eject(this.reqinter)
// 			axios.interceptors.response.eject(this.resinter)
// 		}
// 		render() {
// 			return (
// 				<div>
// 					{this.state.error ? (
// 						<Modal>console.log(this.state.error)</Modal>
// 					) : null}
// 					<WrappedComponent {...this.props} />
// 				</div>
// 			)
// 		}
// 	}
// }
// export default withErrorHandler

// import React, { Fragment, useEffect, useState } from 'react'
// import Modal from '../../UI/Modal/Modal'
// const withErrorHandler = (WrappedComponent, axios) => {
// 	useEffect(() => {
// 		axios.interceptors.response.use(null, error => console.log('Intercepted'))
// 	})
// 	return props => {
// 		// const [error, setError] = useState(null)
// 		// axios.interceptors.request.use(null, error =>
// 		// 	console.log('WTF this aint working')
// 		// )
// 		// axios.interceptors.response.use(null, error => console.log('interceoted'))
// 		return (
// 			<Fragment>
// 				{/* <Modal>Somethings wrong</Modal> */}
// 				<WrappedComponent />
// 			</Fragment>
// 		)
// 	}
// }
// export default withErrorHandler
