import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Raids, raidSchema } from './raids';

export const addRaid = new ValidatedMethod({
    name: 'raids.add',
    validate: raidSchema.validator(),
    run({ verified, dateOccurred, anyDetained, knowHappened, knowHappenedText, address, description, phone, createdOn, geoLocation, media }) {
        if (!this.userId) {
            throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
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
