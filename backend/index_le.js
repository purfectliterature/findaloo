// Dependencies
const express = require('express');

// Configure & Run the http server
const app = express();

app.get('/.well-known/acme-challenge/b3E7ylCOZwyPV_jlxB2WRq8UaehHIpYP63F31jBxoNA', (req, res) => {

	res.send('b3E7ylCOZwyPV_jlxB2WRq8UaehHIpYP63F31jBxoNA.K2WWtoB8z3_eitMin3YB-26s_FT8rZ20IkKbtqTt83U');

})

app.listen(80, () => {
  console.log('HTTP server running on port 80');
});
