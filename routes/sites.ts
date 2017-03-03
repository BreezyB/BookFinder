import * as express from 'express';

import Site from '../models/site';
let router = express.Router();


router.post('/AddSite', (req, res, next) => {

  let site:any = new Site();
  site.name = req.body.name;
  site.street = req.body.street;
  site.state = req.body.state;
  site.zip = req.body.state;
  site.siteSubmitedBy = req.body.siteSubmitedBy
  site.save(function(err, newSite){
    if(err){
      return next(err);
    }
    res.json({message: "Thank you for registering a new Drop Site!"})
  }).catch((err) => {
    res.status(500);
  });
});

// GET all Drop Sites

router.get('/', (req, res) => {
  Site.find().then((sites)=> {
      res.json(sites);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});


// Get a single sites by id
router.get('/:id', (req, res) => {
  Site.findById(req.params['id']).then((site) => {
    res.json(site);
  });
});

// Update existing site
router.post('/:id', (req, res) => {
  let siteId = req.params.id;

  Site.findById(siteId).then((site) => {
    site.name = req.body.name;
    site.street = req.body.street;
    site.state = req.body.state;
    site.zip = req.body.state;
    // save updated animal
    site.save().then((updatedSite) => {
      res.json(updatedSite);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }).catch(() => {
    res.sendStatus(404);
  });
});


// Delete a site (admin only)
router.delete('/:id', (req, res) => {

  let siteId = req.params.id;

  Site.remove({_id:siteId}).then(() => {

    res.sendStatus(200);

  }).catch((err) => {

    res.status(500);

    console.log(err);

  });

});


export default router;
