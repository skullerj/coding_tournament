import React, { Component } from 'react';
import {BrowserRouter as Router, Route , Link } from 'react-router-dom';
import axios from 'axios';

//material components to build the UI
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';

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
    display:'flex',
    position:'relative'
  },
  overlay:{
    position:'absolute',
    top:'50%',
    left: '50%',
    zIndex: 100
  },
  marker:{
    fontSize:64,
    marginTop:'-42px',
    marginLeft:'-42px',
  }
});


class App extends Component {

  constructor(props){
    super(props);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.handleLocationChange=this.handleLocationChange.bind(this);
    this.state={
      mapLocation:{
        lat:null,
        lng:null
      },
      events:[]
    }
  }

  render() {
    const {classes} = this.props;
    const {events} = this.state;
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
              <Route exact path="/send" component={({history})=>(<Form onSubmit={(data)=>{this.handleFormSubmit(data,history) }}> </Form>)}></Route>
              <Route path="/event/:id" render={({match})=>(<Event></Event>)}></Route>
            </div>
          </Drawer>
          <div className={classes.content}>
            <Route path="/send" component={()=>(<div className={classes.overlay}><LocationOn className={classes.marker} color="secondary"></LocationOn></div>)}>
            </Route>
            <Map events={events} onLocationChange={this.handleLocationChange}></Map>
            <Filters></Filters>
          </div>
        </main>
      </Router>
    );
  }

  handleFormSubmit(data,history){

    axios({
      method: 'post',
      url: '/api/events',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then((response)=>{
      history.push('/');
      console.log('Se ha agregado el evento');
    }).catch(()=>{
      console.log('No se agregó el evento')
    });

  }

  componentDidMount(){
    this.getEvents();
  }

  handleLocationChange(location){
    this.setState({
      mapLocation:location
    });
  }

  getEvents(){
    axios.get('/api/events')
      .then((response)=>{
        console.log(response);
        this.setState({events:response.data});
      })
      .catch(()=>{
        console.error('Hubo un error obteniendo los eventos');
      })
  }


}

export default withRoot(withStyles(styles)(App));
