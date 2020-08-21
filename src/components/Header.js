import React, {Fragment} from 'react'
import {AppBar, 
				Toolbar, 
				Typography,
				makeStyles
			} from '@material-ui/core'
import {Link} from 'react-router-dom';


const useStyle = makeStyles((theme) =>({
	
	appBar: {
		position: "fixed",
	},

	text:{
		textDecoration: 'none',
		color: 'white',
	}


}));

const Header = () => {
	const classes = useStyle();
	return(
		<Fragment>
		<AppBar  position="static" className={classes.appBar}>
			<Toolbar variant="dense"> 
				<Typography variant="h6" >
					<Link to="/" className={classes.text}> 				
						CRUD - React, Redux, REST API & Axios
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>

		</Fragment>
	)
}

export default Header;