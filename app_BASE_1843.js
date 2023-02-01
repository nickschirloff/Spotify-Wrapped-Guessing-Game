require('dotenv').config();

const querystring = require('querystring');

const axios = require('axios');

const express = require('express');
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// req = request, res = response
app.get('/', (req, res) => {
    res.send('Hewwo Wowld!!! ~ OwO');
});

const port = 8888;

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const statekey = 'spotify_auth_state';


app.listen(port, () => {
    console.log('Express app listening at http://localhost:${port}');
});

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(statekey, state);
    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });
    res.redirect('https://accounts.spotify.com/authorize?${queryParams}')
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response=>{
            if(response.status === 200){
                res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
            } else {
                res.send(response);
            }
        })
        .catch(error=>{
            res.send(error);
        });
    //res.send('Callback');
});