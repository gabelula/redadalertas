import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Twilio } from 'meteor/dispatch:twilio';
//import { twilioClient } from '../../startup/server/twilio-config.js';

export const sendSMS = new ValidatedMethod({
    name: 'sms.send',
    validate: new SimpleSchema({
        recipient: { type: String },
				message: { type: String }
    }).validator(),
    run({ opts }) {

        const recipient = opts.recipient;
				const message = opts.message;

				twilioClient.sendMessage({
					to: opts.recipient,
					body: opts.message
				});
    }
});
