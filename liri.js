//LIRI JS

//dotenv required
require("dotenv").config();

//key.js file
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

//Axios Required
var axios = require("axios");

//Process commands
var method = process.argv[2]

var userSearch = process.argv.slice(3)

//concert-this
if(method == "concert-this"){
    //Axios 
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log(response);
    }
    );
}
//spotify-this-song
else if(method == "spotify-this-song"){

}
//movie-this
else if(method == "movie-this"){

}
//do-what-it-says
else if(method == "do-what-it-says"){

}

