import React, {Fragment} from 'react';
import { 
				 TableCell,
				 IconButton
 } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';

// Redux 
import {useDispatch} from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions';


const useStyle = makeStyles((theme) => ({
	icon:{
		paddingTop: 0,
		paddingBottom: 0,			
		"&:hover": {
      		backgroundColor: 'transparent'
    },
	}

 }))


const Producto = ({producto}) => {
	const { nombre, precio, id} = producto;


	// Requerido para usar las funciones
	const dispatch = useDispatch();

	// habilitar history para redireccion
	const history = useHistory()

	//Confirmar si desea eliminar
	const confirmarEliminarProducto = id => {
		
		//preguntar al usuario
		Swal.fire({
			title: 'Desea eliminar el Producto?',
			text: 'Estas seguro que desea eliminarlo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si deseo eliminarlo!',
			cancelButtonText: 'Cancelar ',
		}).then((result)=>{
			if(result.value){
				//pasarlo al action
				dispatch(borrarProductoAction(id));			
			}
		})
	}

	//funcion que redirige de forma programada
	const redireccionarEdicion = producto =>{
		dispatch(obtenerProductoEditar(producto));
		history.push(`/productos/editar/${producto.id}`)
	}


	const classes = useStyle();

	return(
		<Fragment >
			<TableCell  align="left">	
				<IconButton className={classes.icon}  component="span" onClick={() =>redireccionarEdicion(producto)} size="small" aria-label="edit">        	
		        	<Edit  />
	        	</IconButton>	 

			    <IconButton className={classes.icon}  onClick={()=>confirmarEliminarProducto(id)} size="small" component="span" aria-label="delete" >        	
			        <DeleteIcon />
			    </IconButton>
			</TableCell>

			<TableCell component="th"  align="left">{nombre}</TableCell>
			
			<TableCell align="right">
				<NumberFormat value={precio} displayType={'text'} thousandSeparator={true} prefix={'$'} />
			</TableCell>

		</Fragment>
	)
}

export default Producto;

