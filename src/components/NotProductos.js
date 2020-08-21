import React from 'react'
import WarningRoundedIcon from '@material-ui/icons/Warning';
import { Typography, Box } from "@material-ui/core";


const NotProductos = () => (
		<Box display="flex" justifyContent="flex-end">
			<WarningRoundedIcon/>
			<Typography variant="h5">
				No hay Productos registrados!
			</Typography>
		</Box>
)

export default NotProductos;