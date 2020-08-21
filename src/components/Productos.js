import React, { useEffect, useState } from 'react';

import {
  Table,
  TableContainer,
  TablePagination,
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell,
  TableSortLabel, 
  Button,
  Paper,
  Typography,
  Box,
  LinearProgress
  } from "@material-ui/core";

import {  makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';
import Producto from './Producto';
import NotProductos from './NotProductos';

// Icons
import AddIcon from '@material-ui/icons/Add';


//redux
import {useSelector, useDispatch} from 'react-redux';
import {obtenerProductosAction} from '../actions/productoActions';



// Funcion para Ordenar tablas
///////////////////////////////////////////////////////////
function descendingComparator(a, b, orderBy){
  if(b[orderBy] < a[orderBy]){
    return -1;
  }

  if(b[orderBy] > a[orderBy]){
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy){
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}


function stableSort(array, comparator){
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if(order !== 0) return order;
      return a[1] - b[1];
  })
  return stabilizedThis.map((el) => el[0]);
}
///////////////////////////////////////////////////////////////////


// Cabezera de la tabla
const headCells = [
  { id: 'accion', label: 'Accion' },
  { id: 'nombre', numeric: false,label: 'Nombre' },
  { id: 'precio', numeric: true,label: 'Precio' },

]
///////////////////////////////////////////////////////////////////

function EnhancedTableHead(props){
  const { classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return(
    <TableHead>
      <TableRow style={{ height: '56px'}}>
        {headCells.map((headCell) =>(
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.numeric ? 'right' : 'left'}
            style={{fontWeight:[600]}}

          >
          
           <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}             
            </TableSortLabel>
          </TableCell>
         ))}
      </TableRow>
    </TableHead>
  )
}

const useStyle = makeStyles((theme)=>({ 
  root:{
    display: 'flex',
    flexDirection: 'column'
  },

  error:{
    marginTop: theme.spacing(3)
  },

  titulo:{
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },

  boton:{
    marginBottom: theme.spacing(2),
    justifyContent:"flexEnd",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },

  },


  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  paper: {
    marginBottom: theme.spacing(2),
  },

  progress:{
    margin: theme.spacing(2),
    width: '100%'
  }

  
}))

const Productos = (props) => {

  const dispatch = useDispatch();
  const classes = useStyle();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('precio');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    // eslint-disable-next-line
  }, [])

  // obterner el state 
  const productos = useSelector(state =>state.productos.productos);
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state => state.productos.loading);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  }

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.titulo}>Listado de Productos</Typography>
      
      <Box display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          disableElevation
          component={Link} 
          to="/productos/nuevo"
          startIcon={<AddIcon />}
          className={classes.boton}>
            Agregar Nuevo
        </Button>    
      </Box>

      <Paper className={classes.paper}>

        <TableContainer className={classes.contained} >
          <Table 
            className={classes.table}
            size='medium'
            aria-label="enhanced table"
          >          
            <EnhancedTableHead 
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            { cargando ? <div className={classes.progress} > <LinearProgress /> </div> : null}

            <TableBody>
              { productos.length === 0 ? <NotProductos/>  : ( 

                stableSort(productos, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((producto) => {
                  return (
                    <TableRow hover>                   
                      <Producto key={producto.id} producto={producto} />
                    </TableRow>
                  );
                }))
              }

                    
            </TableBody>      
          </Table>
        </TableContainer>   
        
        <TablePagination
          labelRowsPerPage = "Columnas Por Paginas: "
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => `Pagina ${from}-${to} de ${count} Paginas`}

        />  
      </Paper>   

     

      {error ? <Alert severity="error" className={classes.error}>Hubo un error en la conexion!</Alert> : null}

    </div>
    )
  
}

export default Productos;