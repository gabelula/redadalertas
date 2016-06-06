import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Raids = new Mongo.Collection('raids');

Raids.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
})

export const raidSchema = new SimpleSchema({
	dateOccurred: {type: String },
	anyDetained: { type: String },
	knowHappened: { type: String },
	knowHappenedText: { type: String },
  address: { type: String, regEx: SimpleSchema.RegEx.ZipCode },
	description: { type: String },
	phone: { type: String },
	createdOn: { type: Date },
	geoLocation: { type: Object },
	'geoLocation.lat': { type: Number, decimal: true },
	'geoLocation.lng': { type: Number, decimal: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
	media: { type: Object },
	'media.images': { type: [Object], optional: true },
	'media.videos': { type: [Object], optional: true }
});

Raids.attachSchema(raidSchema);
