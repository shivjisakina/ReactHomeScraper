const React = require('react');
const axios = require('axios');


const Form = require('./Children/Form');
const Results = require('./Children/Results');
const Saved = require('./Children/Saved');

// Requiring the Helper
const helpers = require('./utils/helper.js');

// Exporting main to app.js
const Main = React.createClass({

    //getting initial state
    getInitialState: function () {
        return {
            topic: "",
            startYear: "",
            endYear: "",
            results: [],
            savedArticles: []
        }
    },

    // setting the term
    setTerm: function (tpc, stYr, endYr) {
        this.setState({
            topic: tpc,
            startYear: stYr,
            endYear: endYr
        })
    },
    // Saving the article Article
    saveArticle: function (title, date, url) {
        helpers.postArticle(title, date, url);
        this.getArticle();
    },
    // Deleting the Article
    deleteArticle: function (article) {
        console.log(article);
        axios.delete('/api/saved/' + article._id)
            .then(function (response) {
                this.setState({
                    savedArticles: response.data
                });
                return response;
            }.bind(this));
        this.getArticle();
    },
    // Get Article
    getArticle: function () {
        axios.get('/api/saved')
            .then(function (response) {
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },

    // Rendering the HTML
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">New York Times Article Scraper</h2>
                        <br/>
                        <p className="text-center">Scrape and Save your articles with ease!</p>
                    </div>
                </div>
                <div className="row">
                    <Form setTerm={this.setTerm}/>
                </div>
                <div className="row">

                    <Results results={this.state.results} saveArticle={this.saveArticle}/>
                </div>
                <div className="row">
                    <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle}/>
                </div>
            </div>
        )
    }
});

// Module Exports
module.exports = Main;