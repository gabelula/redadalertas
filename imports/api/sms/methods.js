import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
//import { twilioClient } from '../../startup/server/twilio-config.js';


export const sendSMS = new ValidatedMethod({
    name: 'sms.send',
    validate: new SimpleSchema({
        recipient: { type: String },
				message: { type: String }
    }).validator(),
    run({ opts }) {
        if (!this.userId) {
            throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
        }

        const recipient = opts.recipient;
				const message = opts.message;

				try {
		      var result = twilioClient.sendMessage({
		        to: opts.recipient,
		        body: opts.message
		      });
		    } catch (err) {
		      throw new Meteor.error(err);
		    }
		    return result;
    }
});
