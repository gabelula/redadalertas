import React, { Component, PropTypes } from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import {Raids} from '../../api/raids/raids.js';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './MyGreatPlace.jsx';

const googlemapskey = Meteor.settings.public.googlemapskey;

const coords = {
  lat: 39.6630348,
  lng: -98.9540999
};

const mapContainer = {
  width: '100%',
  height: '400px'
}

export default class RaidMap extends TrackerReact(React.Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					raids: Meteor.subscribe('allRaids'),
          center: [59.938043, 30.337157]
				}
	    };
	}

	raids() {
		return Raids.find().fetch();
	}

	onMapCreated(map) {
	    map.setOptions({
	      disableDefaultUI: false
	    });
	}

	componentWillUnmount() {
        this.state.subscription.raids.stop();
    }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

	errorImage() {
		return (
			<img src="/loading.png" />
		);
	}

	render() {
		var gmapParams = {
			v: '3.exp',
			key: googlemapskey
		}

		return (
      <div style={mapContainer} >
        <GoogleMap
          apiKey={googlemapskey}
          center={coords}
          zoom={4}>

          <MyGreatPlace lat={33.4898} lng={-112.2616} text={'A'}  />

          {this.raids().map((raid) => <MyGreatPlace
            lat={raid.geoLocation.lat}
            lng={raid.geoLocation.lng}
            key={raid._id}
            text={raid.address} />)}

        </GoogleMap>
      </div>
		)
	}
}
