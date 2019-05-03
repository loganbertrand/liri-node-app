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
//FS Requirement
var fs = require("fs");
//Process commands
var method = process.argv[2]
var userSearch = process.argv.slice(3)
var movieSearch = userSearch.join("+")
var concertSearch = userSearch.join("+")

//If Statement to decide which function to run
if(method == "concert-this"){
    searchConcert(concertSearch);
}
else if(method == "spotify-this-song"){
    
    searchSpotify(userSearch);
}
else if(method == "movie-this"){
    searchMovie(movieSearch);
}
else if(method == "do-what-it-says"){
    doIt();
}

var divider = "\n---------------------------------------------------------------------\n"

//---------------------------------CONCERT-THIS----------------------------------------
function searchConcert(concert){
    //Axios 
    axios.get("https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp").then(
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
function searchSpotify(song){
    //If no song name input
    if (song == "") {
        song = "The Sign Ace of Base";
        }
    //Spotify Search
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //Name of the Song
      console.log("Song Name: " + data.tracks.items[0].name)
      //Artist(s)
      console.log("Artist: " + data.tracks.items[0].artists[0].name)
      //Album Name
      console.log("Album: " + data.tracks.items[0].album.name)
      //Preview Link
      if(data.tracks.items[0].preview_url == null){
          console.log("Song Link: " + data.tracks.items[0].external_urls.spotify)
      }else{
          console.log("Preview Link: " + data.tracks.items[0].preview_url)
      }
      });
}
//---------------------------------MOVIE-THIS----------------------------------------
function searchMovie(movie){
    
    //If no movie name input
    if (movie == "") {
        movie = "mr nobody";
        }
    //Axios
    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t="+ movie).then(
        function(response) {
            var movieResults = response.data
            //console.log(movieResults)
            console.log(
                // * Title of the movie.
                "Movie Title: " + movieResults.Title +
                // * Year the movie came out.
                "\nYear Released: " + movieResults.Year +
                // * IMDB Rating of the movie.
                "\nIMDbRating: " + movieResults.imdbRating +
                // * Rotten Tomatoes Rating of the movie.
                "\nRotten Tomatoes Rating: " + movieResults.Ratings[1].Value +
                // * Country where the movie was produced.
                "\nCountry (or Countries): " + movieResults.Country +
                // * Language of the movie.
                "\nLanguage(s): " + movieResults.Language +
                // * Plot of the movie.
                "\nPlot: " + movieResults.Plot +
                // * Actors in the movie.
                "\nActors: " + movieResults.Actors
            )
            

        })
    
}
//---------------------------------DO-WHAT-IT-SAYS----------------------------------------
function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        var dataArray = data.split(",")
        var doMethod = dataArray[0]
        var doInput = dataArray[1]

        if(doMethod == "spotify-this-song" ){
            searchSpotify(doInput);
        }
        else if(doMethod == "movie-this" ){
            searchMovie(doInput);
        }
        else if(doMethod == "concert-this" ){
            searchConcert(doInput);
        }
    });
}