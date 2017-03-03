"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    submitedBy: String
});
exports.default = mongoose.model('Book', bookSchema);
