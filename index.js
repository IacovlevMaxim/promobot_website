const express = require('express');
const requestIp = require('request-ip');
const fetch = require('node-fetch');
const ip = require('ip');
const app = express();
const port = process.env.PORT || 3000;
const apiToken = process.env.apitoken;

app.use(express.static(__dirname + '/build'));
app.use(requestIp.mw())

app.get('/', (req, res) => {
    res.sendFile('/build/index.html', { root: __dirname });
});

app.get('/commands', (req, res) => {
    res.sendFile('/build/commands.html', { root: __dirname });
});

app.get('/staff', (req, res) => {
    res.sendFile('/build/staff.html', { root: __dirname });
});

app.get('/terms', (req, res) => {
    res.sendFile('/build/terms.html', { root: __dirname });
});

app.get('/privacy', (req, res) => {
    res.sendFile('/build/privacy.html', { root: __dirname });
});

app.get('/setup-gif', (req, res) => {
    res.sendFile('/build/setup_gif.html', { root: __dirname });
})


app.get('/discordapi/user/:id', async(req, res) => {
    if(req.ip != "127.0.0.1") return res.status(403).send;

    if(!req.params.id || isNaN(req.params.id) || req.params.id.length != 18) return res.sendStatus(400);

    const apiRes = await fetch(`https://discordapp.com/api/v6/users/${req.params.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${apiToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    let body = await apiRes.json();
    if(body.code || body.message) {
        body = {
            avatar: "https://i.imgur.com/j3IISku.gif",
            username: "Loading",
            discriminator: "..."
        }
    } else {
        body.avatar = `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.png`;
        delete body.public_flags;
    }

    return res.status(200).json(body);
});

app.get('*', (req, res) => {
    res.status(404).sendFile('/build/404.html', { root: __dirname });
});

const server = app.listen(port,()=>console.log(`Listening on port ${port}...`));
module.exports = server;