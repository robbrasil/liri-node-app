
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

var choice = function(caseData, functionData) {
  switch (caseData) {
    case "movie-this":
      movie(functionData);
      break;
    case "spotify-this-song":
      spotifyMe(functionData);
      break;
    case "my-tweets":
      tweets();
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};
var getArtistNames = function(artist) {
  return artist.name;
};
var tweets = function() {

  var client = new Twitter(keys.twitterKeys);

  var params = {
    screen_name: "robbarbosa02"
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
var movie = function(movieName) {

  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

console.log(`Title: ${jsonData.Title}
Year: ${jsonData.Year}
Rated: ${jsonData.Rated}
IMDB Rating: ${jsonData.imdbRating}
Country: ${jsonData.Country}
Language: ${jsonData.Language}
Plot: ${jsonData.Plot}
Actors: ${jsonData.Actors}
Rotten Tomatoes Rating: ${jsonData.tomatoRating}
Rotten Tomatoes: ${jsonData.tomatoURL}`)
    }
  });
};
var spotifyMe = function(songName) {

  spotify.search({
    type: "track",
    query: songName
  }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {

      console.log(`${i}
      Artist(s): ${songs[i].artists.map(getArtistNames)}
      Song Name: ${songs[i].name}
      Preview Song: ${songs[i].preview_url}
      Album: ${songs[i].album.name}
      -----------------------------------------------
      `);
    
    }
  });
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      choice(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      choice(dataArr[0]);
    }

  });
};

var runThis = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);