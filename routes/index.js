const http = require('http');
var express = require('express');
var router = express.Router();
var axios = require('axios').default;

let instanceId;

router.get('/', async (req, res, next) => {
  if (instanceId) {
    res.render('index', { metadataInstanceId: instanceId });
  } else {
    try {
      const metadataInstanceIdURL = 'http://169.254.169.254/latest/meta-data/instance-id';
      const metadataResponse = await axios.get(metadataInstanceIdURL);
      const metadataInstanceId = metadataResponse.data;
      // "cache" instance ID
      instanceId = metadataInstanceId;
      res.render('index', { metadataInstanceId });
    } catch (error) {
      res.render('index', { metadataInstanceId: 'Error, could not load instance id' });
    }
  }
});

module.exports = router;
