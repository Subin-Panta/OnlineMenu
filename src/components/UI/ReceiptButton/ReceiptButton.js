import React from 'react'
//import PropTypes from 'prop-types'
import classes from './ReceiptButton.module.css'
import { connect } from 'react-redux'
import { clearAll } from '../../../store/actions/index'
const ReceiptButton = ({ clearAll, clickHandler }) => {
	return (
		<div>
			<button className={classes.order} onClick={() => clickHandler()}>
				Order
			</button>
			<button className={classes.clear} onClick={clearAll}>
				Clear All
			</button>
		</div>
	)
}

//ReceiptButton.propTypes = {}
const mapDispatchToProps = { clearAll }
export default connect(null, mapDispatchToProps)(ReceiptButton)
