"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var siteSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    submitedBy: String
});
exports.default = mongoose.model('Site', siteSchema);
