import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Parts = new Mongo.Collection('parts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('parts', function partsPublication() {
    return Parts.find({ owner: this.userId });
  });
}

Meteor.methods({
  'part.insert'(title, num, qty, price, myPrice, location, appliance, photo) {
    check(title, String);
    check(num, String);
    check(qty, Number);
    check(price, String);
    check(myPrice, String);
    check(location, String);
    check(appliance, String);
    check(photo, String);
 
    Parts.insert({
      title,
      num,
      qty,
      price,
      myPrice,
      location,
      appliance,
      photo,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'part.remove'(partId) {
    check(partId, String);

    const part = Parts.findOne(partId);
    if (part.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Parts.remove(partId);
  },

  'partQTY.update'(partId, qty) {
    check(partId, String);
    check(qty, Number);

    const part = Parts.findOne(partId);
    if (part.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Parts.update(partId, { $set: { "qty" : qty } });
  },

  'fullPart.update'(partId, title, num, qty, price, myPrice, location, appliance) {
    check(partId, String);
    check(title, String);
    check(num, String);
    check(qty, Number);
    check(price, String);
    check(myPrice, String);
    check(location, String);
    check(appliance, String);

    const part = Parts.findOne(partId);
    if (part.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Parts.update(partId, { $set: { title, num, qty, price, myPrice, location, appliance } });
  },

  'partPhoto.update'(partId, photo) {
    check(partId, String);
    check(photo, String);

    const part = Parts.findOne(partId);
    if (part.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Parts.update(partId, { $set: { "photo" : photo } });
  },

  'partImage.remove'(partId) {
    check(partId, String);

    const part = Parts.findOne(partId);
    if (part.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Parts.update(partId, { $set: { "photo" : null } });
  }

});