import { Twilio } from 'meteor/dispatch:twilio';

// Configure the Twilio client
export const twilioClient = new Twilio({
  from: Meteor.settings.public.TWILIO.FROM,
  sid: Meteor.settings.public.TWILIO.SID,
  token: Meteor.settings.public.TWILIO.TOKEN
});
