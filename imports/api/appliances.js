import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Appliances = new Mongo.Collection('appliances');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('appliances', function appliancesPublication() {
    return Appliances.find({ owner: this.userId });
  });
}

Meteor.methods({
  'appliance.insert'(name) {
    check(name, String);
 
    Appliances.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'appliance.remove'(applianceId) {
    check(applianceId, String);

    const appliance = Appliances.findOne(applianceId);
    if (appliance.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Appliances.remove(applianceId);
  },

});