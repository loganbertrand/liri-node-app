//LIRI JS

//dotenv required
require("dotenv").config();

//Moment required for time format
var moment = require("moment")
//key.js file
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

//Axios Required
var axios = require("axios");

//Process commands
var method = process.argv[2]

var userSearch = process.argv.slice(3)

//Long If Statement to decide which function to run
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



//concert-this
function searchConcert(){
    //Axios 
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response.data);
            //FOR EACH LOOP TO LIST IT ALL
        }
        );

}

//spotify-this-song
function searchSpotify(){

}
//movie-this
function searchMovie(){

}
//do-what-it-says
function doIt(){
    
}