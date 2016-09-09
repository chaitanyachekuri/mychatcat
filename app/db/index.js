'use strict';

const config = require('../config');
const logger = require('../logger');
const mongoose = require('mongoose');

mongoose.connect(config.dbUri);

mongoose.connection.on('error', (error) => {
    logger.log('error', "MongoDB Error: " + error);
});

//create a schema that defines the structure for storing user data
const chatUser = new mongoose.Schema({
   profileId: String,
   fullName: String,
   profilePic: String
});

let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
    mongoose,
    userModel
}