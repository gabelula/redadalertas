import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, {
            fields: {
                'alerts.getsAlerts': 1,
								'alerts.mobileCarrier': 1,
								'alerts.mobileNumber': 1,
								isAdmin: 1
            }
        });
    } else {
        return this.ready();
    }

});

Meteor.publish(null, function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, {
            fields: {
                'alerts.getsAlerts': 1,
								'alerts.mobileCarrier': 1,
								'alerts.mobileNumber': 1,
								isAdmin: 1
            }
        });
    } else {
        return this.ready();
    }

});
