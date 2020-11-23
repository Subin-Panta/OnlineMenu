import React, { Fragment } from 'react'
import classes from './Modal.module.css'

const Modal = props => {
	return (
		<Fragment>
			<div className={classes.backDrop} onClick={props.clickHandler}></div>
			<div className={classes.modal}>{props.children}</div>
		</Fragment>
	)
}

export default Modal
