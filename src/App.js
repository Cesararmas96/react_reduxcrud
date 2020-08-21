import React, {Fragment} from 'react';
import { BrowserRouter as Router, 
        Switch, 
        Route,
        } from "react-router-dom";
import Header from './components/Header';

// Theme de material-ui
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import { makeStyles } from "@material-ui/core";

import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

//Redux
import {Provider} from 'react-redux';
import store from './store';

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

}));

function App() {

  const classes = useStyle();

  return (
    <Fragment className={classes.root}>
      <ThemeProvider theme={theme}>

     <Router>
      <Provider store={store}>
        <Header/>     
          <div className={classes.content}>
          <Switch>
                <Route exact path="/" component={Productos}/>
                <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          </Switch>
          </div>
        </Provider>
        </Router>
      </ThemeProvider>

   </Fragment>
  );
}

export default App;
