const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Enable CORS for all routes
app.use(cors());

// Proxy requests to the target API
app.all('/api/*', (req, res) => {
    proxy.web(req, res, { target: 'https://api.covid19india.org' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
