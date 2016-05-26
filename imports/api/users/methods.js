import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


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

        //Meteor.user().update(newAlert);
				Meteor.users.update(this.userId, {$set: {"alerts.getsAlerts": newAlert}});
				console.log(this.userId);
    }
});

export const loginUser = new ValidatedMethod({
	name: 'user.Login',
	validate: new SimpleSchema({
		username: { type: String },
		password: { type: String }
	}).validator(),
	run({ username, password }) {
		if ( this.userId ) {
			throw new Meteor.Error('Ya esta autenticado con la aplicacion.');
		}

		const loginData = { username, password };

		Meteor.loginWithPassword(username, password, function(err, res){
			if(err){
				console.log(err);
			} else {
				console.log(res);

			}
		});
	}
});
