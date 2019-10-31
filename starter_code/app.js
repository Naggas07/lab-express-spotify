require('dotenv').config()

const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// require spotify-web-api-node package here:

const SpotifyWebApi = require("spotify-web-api-node");



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });




// the routes go here:



app.get('/artists', (req, res) => {
  const artist = req.query.artist
  spotifyApi
  .searchArtists(artist)
  .then(data => {
    console.log("The received data from the API: ", data.body.artists);
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render('artist', data)
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  });
})

app.get('/', (req, res, next) => {
  res.render('layout')
})



app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));