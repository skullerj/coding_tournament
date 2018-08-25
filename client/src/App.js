import React, { Component } from 'react';
import {BrowserRouter as Router, Route , Link } from 'react-router-dom';

//material components to build the UI
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from './styles/sharedStyles.js';
import withRoot from './withRoot.jsx';

//Custom components
import Map from './components/Map';
import Filters from './components/Filters';
import Form from './components/Form';
import List from './components/List';
import Event from './components/Event';

//Test data
import {events} from "./components/__tests__/fixtures.json";

const styles = theme => ({
  ...sharedStyles(theme),
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: theme.spacing.unit*45
  },
  drawerContent: {
    marginTop:theme.spacing.unit * 8,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  content:{
    width:'100%',
    marginRight:theme.spacing.unit*45,
    marginTop:theme.spacing.unit * 8,
    flexDirection:'column',
    display:'flex'
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
            <div className={classes.drawerContent}>
              <Route exact path="/" component={()=>(<List events={events}></List>)}></Route>
              <Route exact path="/send" component={()=>(<Form></Form>)}></Route>
              <Route path="/event/:id" render={({match})=>(<Event></Event>)}></Route>
            </div>
          </Drawer>
          <div className={classes.content}>
            <Map events={events}></Map>
            <Filters></Filters>
          </div>
        </main>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(App));
