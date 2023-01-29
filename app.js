var SpotifyWebApi = require('spotify-web-api-node');

const client = require("./clientInfo");
const ci = new client.ClientInfo();

var spotifyApi = new SpotifyWebApi({
    clientId: ci.clientID,
    clietnSecret: ci.clientSecret,
    redirectUri: 'http://google.com/callback/'
});

var msg = 'Hello World';
console.log(msg);