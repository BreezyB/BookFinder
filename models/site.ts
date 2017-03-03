import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let siteSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  submitedBy: String
});


export default mongoose.model('Site', siteSchema);
