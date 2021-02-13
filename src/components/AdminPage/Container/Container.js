import React from 'react'
import classes from './Container.module.css'
//import PropTypes from 'prop-types'

const Container = props => {
	return <div className={classes.container}>{props.children}</div>
}

// Container.propTypes = {

// }

export default Container
