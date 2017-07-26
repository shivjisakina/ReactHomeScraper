// Axios handles http request
// Had to switch to var bc Const gave error
var axios = require('axios');
// NYT API
var nytAPI = "097be422255e45a18b6864a8176f4a6c";
// Helper
var helpers = {
	runQuery: function(topic, startYear, endYear){
		// Scrape from website
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){
				var newResults = [];
				var fullResults = response.data.response.docs;
				var counter = 0;
				// Get articles that meet search params
				for(var i = 0; i < fullResults.length; i++){
					if(counter > 4) {
						return newResults;
					}
					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}
				return newResults;
		})
	},
	// Save Articles to DB
	postArticle: function(title, date, url){
		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){
			console.log("Saved to DB");
			return(results);
		})
	}
}

// Export Helpers
module.exports = helpers;