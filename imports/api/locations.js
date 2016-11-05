import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Locations = new Mongo.Collection('locations');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('locations', function locationsPublication() {
    return Locations.find({ owner: this.userId });
  });
}

Meteor.methods({
  'location.insert'(name) {
    check(name, String);
 
    Locations.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'location.remove'(locationId) {
    check(locationId, String);

    const location = Locations.findOne(locationId);
    if (location.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Locations.remove(locationId);
  },

});