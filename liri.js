//LIRI JS

//dotenv required
require("dotenv").config();

//Moment required for time format
var moment = require("moment")
//key.js file
var keys = require("./keys.js");

//Spotify Requirements
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Axios Required
var axios = require("axios");

//Process commands
var method = process.argv[2]
var userSearch = process.argv.slice(3)

//If Statement to decide which function to run
if(method == "concert-this"){
    searchConcert();
}
else if(method == "spotify-this-song"){
    searchSpotify();
}
else if(method == "movie-this"){
    searchMovie();
}
else if(method == "do-what-it-says"){
    doIt();
}

var divider = "\n---------------------------------------------------------------------\n"

//---------------------------------CONCERT-THIS----------------------------------------
function searchConcert(){
    //Axios 
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
        function(response) {
            var concertResponse = response.data;
            
            //FOR EACH LOOP TO LIST DATA FOR ALL EVENT RESULTS
            for (var i = 0; i < concertResponse.length; i++){
                console.log(
                    "Venue: " + concertResponse[i].venue.name + 
                    "\nLocation: " + concertResponse[i].venue.city + ", " + concertResponse[i].venue.region +
                    "\nEvent Date: " + moment(concertResponse[i].datetime).format("MM DD YYYY")
                    + divider
                )
            }   
        }
    );
}

//-----------------------------SPOTIFY-THIS-SONG-------------------------------------------
function searchSpotify(){
    //Spotify Search
    spotify.search({ type: 'track', query: userSearch }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}
//---------------------------------MOVIE-THIS----------------------------------------
function searchMovie(){

}
//---------------------------------DO-WHAT-IT-SAYS----------------------------------------
function doIt(){
    
}