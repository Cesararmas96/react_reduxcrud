import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {CircularProgress,
				TextField,
				Button,
				makeStyles,
				Typography,
				Box,
				Paper
			} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';

//action de redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const useStyle = makeStyles((theme) => ({
	error:{
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}
}));

function NumberFormatCustom(props) {
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

const NuevoProducto = ({history}) =>{
	//state del component

	const [nombre, guardarNombre] = useState('');
	const [precio, guardarPrecio] = useState(null);


	//utilar use dispatch y te crea una funcion
	const dispatch = useDispatch();

	// Acceder al state del store
	const cargando = useSelector((state) => state.productos.loading);
	const error = useSelector(state => state.productos.error)
	const alerta = useSelector(state => state.alerta.alerta)

	//mandar llamar el action de productioAction
	const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));


	const submitNuevoProducto = e => {
		e.preventDefault();

		//validar formulario
		if(nombre.trim === "" || precio <= 0 ){

			const alerta = {
				msg: 'Ambos campos son obligatorios'
			}

			// La funcion necesita el dispatch para correr
			dispatch(mostrarAlerta(alerta));
			return;
		}		

		//si no hay errores
		dispatch(ocultarAlertaAction());

		//crear el nuevo producto
		agregarProducto({
			nombre,
			precio,
			id : uuidv4()
		});

		history.push('/');
	}

	const classes = useStyle();

	return(
		<Paper style={{ marginTop: '50px'}}>
				<Typography variant="h5" style={{textAlign: 'center', padding: '20px'}}>
					Agregar Nuevo Producto
				</Typography>				


			<form onSubmit={submitNuevoProducto}>
				  	
			<div style={{ padding: '40px' }}>
				{alerta ? <Alert severity="warning" className={classes.error}>Todo los campos son obligatorios!</Alert> : null}
			  <TextField 
			  	style={{marginBottom: '30px'}}
			  	fullWidth 
				  name="nombre" 
				  label="Nombre Producto" 
				  value={nombre} 
			  	onChange={e=>guardarNombre(e.target.value)}/>

			  <TextField 
			  	style={{marginBottom: '30px'}}
				  fullWidth 		  
				  name="precio" 
				  label="Precio del Producto" 
				  value={precio} 
				  onChange={e=>guardarPrecio(Number(e.target.value))}
					InputProps={{
          	inputComponent: NumberFormatCustom,
       		}}
				  />
				  
				  <Box display="flex" justifyContent="center">
	   				<Button startIcon={<SaveIcon/>} style={{alignItem: 'center'}} type="submit" variant="contained" color="secondary">Guardar</Button>
	   			</Box>
   				</div>

				</form>
				{ cargando ? <CircularProgress/> : null }
			<div>
		</div>
				
		{error ? <Alert severity="error" className={classes.error}>Hubo un error en la conexion!</Alert> : null}
		</Paper>
	)
}

export default NuevoProducto;