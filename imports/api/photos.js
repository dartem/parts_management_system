import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Photos = new Mongo.Collection('photos');

if (Meteor.isServer) {
  
  Meteor.publish('photos', function photosPublication() {
    return Photos.find({ owner: this.userId });
  });

}

Meteor.methods({

  'photo.insert'(photo) {
  	check(photo, String);
 
    Photos.insert({
      photo,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'photo.update'(photoId, photo) {
  	check(photoId, String);
  	check(photo, String);

    const thisPhoto = Photos.findOne(photoId);
    if (thisPhoto.owner !== this.userId) {
      // making sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Photos.update(photoId, { $set: { "photo" : photo } });
  },

});