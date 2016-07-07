import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';


const K_WIDTH = 10;
const K_HEIGHT = 10;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: (-K_WIDTH / 2) - 132,
  top: -K_HEIGHT / 2,

  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'yellow',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 0
};


const style = {
	fontSize: '12em',
	fontWeight: '100'
}

export default class MyGreatPlace extends TrackerReact(Component){



	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
				}
	    };
	}

	render() {
		return (
			<div style={greatPlaceStyle} text={this.props.text}>

       </div>
		)
	}

}
