const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();
const yaml = require('js-yaml');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req);
  console.log(req.query);

  let result = null;

  if (req.query.url) {
    parser.parseURL(req.query.url).then(result => {
      res.render('rss-parser', {
        title: 'rss-parser',
        url: req.query.url || '',
        result: yaml.dump(result),
      });
    }).catch(error => {
      res.render('error', {
        message: 'Error!',
        error,
      });
    });
  } else {
    res.render('rss-parser', {
      title: 'rss-parser',
      url: req.query.url || '',
      result: null,
    });
  }
});

module.exports = router;
