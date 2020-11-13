import React from 'react'
import classes from './spinner.module.css'
const spinner = () => {
	return (
		<div className={classes.center}>
			<div className={classes.loader}>...Loading</div>
		</div>
	)
}

export default spinner
