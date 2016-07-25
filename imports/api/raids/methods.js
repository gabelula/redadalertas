import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Raids, raidSchema } from './raids';
import { TAPi18n } from 'meteor/tap:i18n';

export const addRaid = new ValidatedMethod({
    name: 'raids.add',
    validate: raidSchema.validator(),
    run({ verified, dateOccurred, anyDetained, knowHappened, knowHappenedText, address, description, phone, createdOn, geoLocation, media }) {
        if (!this.userId) {
            throw new Meteor.Error(TAPi18n.__('submit_error_not_logged_in'));
        }

        const raid = {
						verified,
						dateOccurred,
						anyDetained,
						knowHappened,
						knowHappenedText,
            address,
            description,
						phone,
            createdOn,
            geoLocation: {
                lat: geoLocation.lat,
                lng: geoLocation.lng
            },
            userId: this.userId,
            media
        };

        Raids.insert(raid);
    }
});
