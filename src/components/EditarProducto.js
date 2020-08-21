import React, {useState, useEffect} from 'react';
import {
				TextField,
				Button,
				Typography,
				Box,
				Paper
				
			} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';


//action de redux
// useDispatch Para ejecutar las accion
// useSelector para acceder al state
import {useDispatch, useSelector} from 'react-redux';
import {editarProductoAction} from '../actions/productoActions'

const  NumberFormatCustom =(props)  =>{
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const EditarProducto = () => {

	const history = useHistory();	

	// Llamada al action
	const dispatch = useDispatch();

	// Nuevo state de producto
	const [producto, guardarProducto] = useState({
		nombre: '',
		precio: ''
	})

	const productoeditar = useSelector(state => state.productos.productoeditar)	

	//llenar el state automaticamente
	useEffect(() => {
		guardarProducto(productoeditar)
	},[productoeditar]);
 	
 	const onChangeFormulario = e => {
 		guardarProducto({
 			...producto,
 			[e.target.name] : e.target.value
 		})
 	}
 
	const {nombre, precio} = producto;

	const submitEditarProducto = e => {
		e.preventDefault();
		dispatch(editarProductoAction(producto));

		history.push('/')
	}

	return(
		<Paper style={{ marginTop: '50px'}}>
			<Typography variant="h5" style={{textAlign: 'center', padding: '20px'}}>
				Editar Producto
			</Typography>				

			<form onSubmit={submitEditarProducto} style={{ padding: '40px' }}>				  	
			  <TextField 
			  	style={{marginBottom: '30px'}}
			  	fullWidth 
				  name="nombre" 
				  label="Nombre Producto" 
				  value={nombre}
				  onChange={onChangeFormulario}/>


			  <TextField 
			  	style={{marginBottom: '30px'}}
				  fullWidth 		  
				  name="precio" 
				  label="Precio del Producto" 
				  value={precio}
				  onChange={onChangeFormulario}
				  InputProps={{inputComponent: NumberFormatCustom}}
		        />
				  
				 <Box display="flex" justifyContent="center">
   				<Button startIcon={<SaveIcon/>} style={{alignItem: 'center'}} type="submit" variant="contained" color="secondary">Guardar</Button>
   			</Box>
		</form>
	</Paper>
	)
}

export default EditarProducto;