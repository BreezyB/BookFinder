import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  submitedBy: String
});


export default mongoose.model('Book', bookSchema);
