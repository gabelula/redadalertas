import { Twilio } from 'meteor/dispatch:twilio';

// Configure the Twilio client
export const twilioClient = new Twilio({
  from: Meteor.settings.private.TWILIO.FROM,
  sid: Meteor.settings.private.TWILIO.SID,
  token: Meteor.settings.private.TWILIO.TOKEN
});
