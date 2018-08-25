import React, { Component } from 'react';
import {BrowserRouter as Router, Route , Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import withRoot from './withRoot.jsx';
import sharedStyles from './styles/sharedStyles.js';

const styles = theme => ({
  ...sharedStyles(theme),
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: theme.spacing.unit*45
  },
  content: {
    marginTop:theme.spacing.unit * 4,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  }
});


class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Router>
        <main className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.horizontal}>
              <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                Deliktum
              </Typography>
              <Link to="/send" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary">Registrar Evento</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="right"
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.content}>
              <Route exact path="/" component={()=>(<h1>List</h1>)}></Route>
              <Route exact path="/send" component={()=>(<h1>Enviar</h1>)}></Route>
              <Route path="/event/:id" render={({match})=>(<h1>Evento: {match.params.id}</h1>)}></Route>
            </div>

          </Drawer>
        </main>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(App));
