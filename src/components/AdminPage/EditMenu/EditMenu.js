import classes from './EditMenu.module.css'
import React from 'react'
import Menu from '../../Layout/Menu/Menu'
import EditingComponent from '../EditingComponent/EditingComponent'
// import PropTypes from 'prop-types'

const EditMenu = props => {
	return (
		<div>
			<div className={classes.container}>
				<div>
					<EditingComponent />
				</div>
				<div className={classes.menu}>
					<Menu admin />
				</div>
			</div>
		</div>
	)
}

// EditMenu.propTypes = {

// }

export default EditMenu
