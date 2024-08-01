const axios = require('axios');
const path = require('path');
const https = require('https');
const rootCas = require('ssl-root-cas').create();

rootCas.addFile(path.resolve(__dirname, 'intermediate.pem'));
const httpsAgent = new https.Agent({ca: rootCas});

axios.get('https://incomplete-chain.badssl.com', { httpsAgent })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });