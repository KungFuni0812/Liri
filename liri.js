require("dotenv").config();
var keysJs = require("./keys");
var axios = require("axios");
var moment = require("moment");
//var spotify = new Spotify(keysJs.spotify);
var commands = process.argv[2];
var name = "";

for (var i = 3; i < process.argv.length; i++) {
    name = name + " " + process.argv[i]
}

name = name.trim();

switch(commands) {
    case 'concert-this': 
    var queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        if(response.data.length == 0){
            console.log(name + " does not have any upcoming concert, try a different band or artist");
        }else {
            for (var e = 0; e < response.data.length; e++) {
                console.log("Name of the venue: " + response.data[e].venue.name);
                console.log("Venue location: " + response.data[e].venue.location);
                var dateTime = response.data[e].datetime;
                var momentDate = moment(dateTime, "YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY");
                console.log("Date of the Event: " + momentDate);
                console.log("~~~~~~~~~~~~~~~")
            };
        }
    })
        break; 
    case 'spotify-this-song':
        console.log();
        break;
    case 'movie-this':
        var queryUrl = '';
        if (process.argv[3] != undefined) {
            queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
        } else {
            queryUrl = "http://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy";
        }
        axios.get(queryUrl).then(function(response) {
            if(response.status == 200){
                console.log("Title of the movie: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language of the movie: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
            }
        })
        break;
    case "do-what-it-says":
        console.log();
        break;
    default:
        console.log('You did not type a valid command. Please type either "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says".');
        break;
}