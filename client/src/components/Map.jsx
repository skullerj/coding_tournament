import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Script from 'react-load-script';
//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = (theme)=> {
  return {
    mapContainer:{
      display:'flex',
      flexDirection:'column',
      flexGrow:'1'
    },
    map:{
      display:'flex',
      width:'100%',
      flexGrow:'1'
    }
  }
}

const mapOptions = {
  center: {
    lat: -0.225219,
    lng: -78.5248
  },
  zoom: 16
};

const apiConfig = {
  key:'AIzaSyC3zMqvD8RoNadbq25lxlfjHEzDWaZb5nE'
};

class Map extends Component {

  componentDidMount(){

  }

  constructor(props){
    super(props);
    this.scriptsLoaded=0;
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.mapContainer}>
        <Script url="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"
          onLoad={this.handleLoad.bind(this)}>
        </Script>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3zMqvD8RoNadbq25lxlfjHEzDWaZb5nE"
          onLoad={this.handleLoad.bind(this)}>
        </Script>
        <div ref="map" className={classes.map}></div>
      </div>
    )
  }

  createMarkers(events){
    return events.map((event)=>{
      let marker = new this.mapSDK.Marker({
          position: event.location,
          label: event.id[0],
          map:this.map
      });
      marker.addListener('click',()=>{
        this.onMarkerClick(event.id);
      });
    });
  }

  handleLoad(){
    this.scriptsLoaded+=1;
    if(this.scriptsLoaded===2){
      this.markerClusterSKD = window.MarkerClusterer;
      this.mapSDK = window.google.maps;
      this.map = new this.mapSDK.Map( this.refs.map, mapOptions );
      this.mapSDK.event.addListener(this.map,'dragend',()=>{
        this.handleLocationChange(this.map.getCenter());
      });
      this.handleLocationChange(this.map.getCenter());
      this.setUpMapMarkers(this.props.events);
    }
  }

  setUpMapMarkers(events){
    if(!this.map)return;
    if(events.length===0)return;
    this.map.addMark
    if(this.markerCluster){
      this.markerCluster.clearMarkers();
      this.markerCluster.addMarkers(this.createMarkers(events));
    }else{
      this.markerCluster = new this.markerClusterSKD(this.map, this.createMarkers(events),
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
  }

  handleLocationChange(center){
    this.props.onLocationChange({lat:center.lat(),lng:center.lng()});
  }

  componentDidUpdate(props,state,snapshot){
    this.setUpMapMarkers(props.events);
  }


}

export default withStyles(styles)(Map);
