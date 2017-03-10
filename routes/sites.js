"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require('passport');
var site_1 = require("../models/site");
var router = express.Router();
router.post('/AddSite', function (req, res, next) {
    var site = new site_1.default();
    site.name = req.body.name;
    site.street = req.body.street;
    site.state = req.body.state;
    site.zip = req.body.state;
    site.submitedBy = req.body.submitedBy;
    site.save(function (err, newSite) {
        if (err) {
            return next(err);
        }
        res.json({ message: "Thank you for registering a new Drop Site!" });
    }).catch(function (err) {
        res.status(500);
    });
});
router.get('/', function (req, res) {
    site_1.default.find().then(function (sites) {
        res.json(sites);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    site_1.default.findById(req.params['id']).then(function (site) {
        res.json(site);
    });
});
router.post('/:id', function (req, res) {
    var siteId = req.params.id;
    var book = req.body;
    site_1.default.findById(siteId).then(function (site) {
        site.save().then(function (updatedSite) {
            res.json(updatedSite);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    }).catch(function () {
        res.sendStatus(404);
    });
});
router.delete('/:id', function (req, res) {
    var siteId = req.params.id;
    site_1.default.remove({ _id: siteId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
exports.default = router;
