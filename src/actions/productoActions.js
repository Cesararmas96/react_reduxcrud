import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITO,
	DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR, 
	PRODUCTO_ELIMINAR_EXITO,
	PRODUCTO_ELIMINAR_ERROR,
	OBTENER_PRODUCTO_EDITAR, 
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR,
	COMENZAR_EDICION_PRODUCTO
	} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';



//crear nuevos productos
export function crearNuevoProductoAction(producto){
	return async (dispatch) => {
		dispatch(agregarPoducto());
		try{
			//insertar en la api
			await clienteAxios.post('/productos', producto);
			
			//si todo sale bien
			dispatch(agregarProductoExito(producto));

			//Alert
			Swal.fire(
				'Correcto',
				'El producto se agrego correctamente',
				'success'
			);

		}catch(error){
			console.log(error);
			// si hay un error cambia el state
			dispatch(agregarPoductoError(true));

			// alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Hubo un error',
				text: 'Hubo un error, intenta de nuevo.'
			})
		}
	}	 
}

const agregarPoducto = () => ({  
	type: AGREGAR_PRODUCTO,
	payload: true
})

// si el producto se guarda
const agregarProductoExito = producto => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto
});

// si hay un error
const agregarPoductoError = (estado) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado
});

// funcion que descarga los productos desde la db

export function obtenerProductosAction(){
	return async (dispatch) => {
		dispatch(descargarProductos());

		try{
			const respuesta = await clienteAxios.get('/productos');
			dispatch(descargarProductosExitosa(respuesta.data));
		}catch(error){
			console.log(error)
			dispatch(descargarProductosError()); 
		}
	}
}

const descargarProductos = () => ({
	type : COMENZAR_DESCARGA_PRODUCTOS,
	payload: true
})

const descargarProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos
});

const descargarProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
	return async(dispatch)=>{
		dispatch(obtnerProductoEliminar(id));

		try{
			await clienteAxios.delete(`/productos/${id}`)
			dispatch(eliminarProductoExito());

			//Si se elimina, mostrar el alerta
			Swal.fire(
				'Eliminado!',
				'Tu producto ha sido eliminado ',
				'succes'			

			)

		}catch(error){
			console.log(error);
			dispatch(eliminarProductoError())
		} 
	}
}

const obtnerProductoEliminar = id =>({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: idK
})

const eliminarProductoExito = () =>({
	type: PRODUCTO_ELIMINAR_EXITO,
})

const eliminarProductoError = () =>({
	type: PRODUCTO_ELIMINAR_ERROR,
	payload: true
})

//Colocar producto en edicion
export function obtenerProductoEditar(producto){
	return (dispatch) =>{
		dispatch(obtenerProductoEditarAction(producto))
	}
}

const obtenerProductoEditarAction = producto =>({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto
})

// Editar un registro en la api y state
export function editarProductoAction(producto){
	return async(dispatch)=>{
		dispatch(editarProducto(producto))
		console.log(producto)
		try{
			// Se le pasa el producto id y el nuevo que va a tener nueva informacion
			await clienteAxios.put(`/productos/${producto.id}`, producto);
			dispatch(editarProductoExito(producto))

		}catch(error){
			console.log(error)
			dispatch(editarProductoError())

		}
	}
}

const editarProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto
})

const editarProductoError = () =>({
	type: PRODUCTO_EDITADO_ERROR,
	payload: true
})
