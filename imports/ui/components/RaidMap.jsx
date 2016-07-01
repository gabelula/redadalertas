import React, { Component } from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import {Raids} from '../../api/raids/raids.js';

const googlemapskey = Meteor.settings.public.googlemapskey;

const coords = {
  lat: 39.6630348,
  lng: -98.9540999
};

export default class RaidMap extends TrackerReact(React.Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					raids: Meteor.subscribe('allRaids')
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
			<Gmaps
        width={'100%'}
        height={'400px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={4}
        loadingMessage={this.errorImage()}
        params={gmapParams}
        onMapCreated={this.onMapCreated}>

					{this.raids().map((raid) => <InfoWindow
						lat={raid.geoLocation.lat}
						lng={raid.geoLocation.lng}
						draggable={false} key={raid._id}
						animation={google.maps.Animation.DROP} />)}

      </Gmaps>
		)
	}
}
