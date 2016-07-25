import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function (options, user) {
	user.isAdmin = false;
	user.alerts = {};
	user.alerts.getsAlerts = false;
	user.alerts.mobileCarrier = '';
	user.alerts.mobileNumber = '';
	// if(user.services.facebook.email === 'celso.mireles@gmail.com'){
	// 	user.isAdmin = true;
	// }
	return user;
});

Meteor.users.deny({
  insert: function (userId, doc) {
    // only admin can insert
    var u = Meteor.users.findOne({_id:userId});
    return !(u && u.isAdmin);
  },
  update: function (userId, doc, fields, modifier) {
    console.log("user "+userId+"wants to modify doc"+doc._id);
    if (userId && doc._id === userId) {
      console.log("user allowed to modify own account!");
      // user can modify own
      return false;
    }
    // admin can modify any
    var u = Meteor.users.findOne({_id:userId});
    return !(u && u.isAdmin);
  },
  remove: function (userId, doc) {
    // only admin can remove
    var u = Meteor.users.findOne({_id:userId});
    return !(u && u.isAdmin);
  }
});
