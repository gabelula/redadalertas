import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'


export const updateAlert = new ValidatedMethod({
    name: 'user.updateAlert',
    validate: new SimpleSchema({
        getsAlerts: { type: Boolean }

    }).validator(),
    run({ getsAlerts }) {
        if (!this.userId) {
            throw new Meteor.Error('Necesita iniciar sesion para realizar esta operacion');
        }

        const newAlert = getsAlerts;

        Meteor.user().update(newAlert);
				Meteor.users.update(this.userId, {$set: {"getsAlerts": newAlert}});
				console.log(this.userId);
    }
});
