// Axios handles http request
// Had to switch to var bc Const gave error
var axios = require('axios');

var APIkey = "a7ba7cef867545aabd87e9921566b853";

var helpers = {
	runQuery: function(topic, startYear, endYear){

		// Scraping from the NYT website
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIkey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){
				var Results = [];
				var allResults = response.data.response.docs;
				var counter = 0;

				for(var i = 0; i < allResults.length; i++){

					if(allResults[counter].headline.main && allResults[counter].pub_date && allResults[counter].web_url) {
						newResults.push(allResults[counter]);
						counter++;
					}
				}
				return Results;
		})
	},
	// Storing results in the db
	postArticle: function(title, date, url){
		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){
			console.log("Saved to DB");
			return(results);
		})
	}
}

// Module exporting
module.exports = helpers;