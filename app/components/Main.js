const axios = require('axios');
const React = require('react');

// Sub-Comps.
const Form = require('./Children/Form');
const Results = require('./Children/Results');
const Saved = require('./Children/Saved');

// Require Helper
const helpers = require('./utils/helper.js');

// Main Comp. 
const Main = React.createClass({

    // State for clicks
    getInitialState: function () {
        return {
            topic: "",
            startYear: "",
            endYear: "",
            results: [],
            savedArticles: []
        }
    },

    // Allow child to update the parent w/ searchTerms
    setTerm: function (tpc, stYr, endYr) {
        this.setState({
            topic: tpc,
            startYear: stYr,
            endYear: endYr
        })
    },
    // Save Article
    saveArticle: function (title, date, url) {
        helpers.postArticle(title, date, url);
        this.getArticle();
    },
    // Delete Article
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
    // Capture Article
    getArticle: function () {
        axios.get('/api/saved')
            .then(function (response) {
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },

    // Updates Comp.
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.topic != this.state.topic) {
            // console.log("UPDATED");
            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
                .then(function (data) {
                    console.log(data);
                    if (data != this.state.results) {
                        this.setState({
                            results: data
                        })
                    }
                }.bind(this))
        }
    },
    // Save Comp.
    componentDidMount: function () {
        axios.get('/api/saved')
            .then(function (response) {
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },
    // Render HTML
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron title" style={{
                        'backgroundImage': 'url(./assets/images/2.jpg)',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundPosition': 'center',
                        'backgroundOrigin': 'border-box',
                        'backgroundSize': '100% 100%'
                    }}>
                        <h2 className="text-center" style={{
                            'color': 'black',
                            'textShadow': '3px 3px 10px blue',
                            'fontSize': '68px'
                        }}>New York Times </h2>
                        <br/>
                        <p className="text-center" style={{
                            'color': 'blue',
                            'textShadow': '3px 3px 10px black',
                            'fontSize': '32px'
                        }}>Search, Save, & Delete Articles!</p>
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

// Export Main
module.exports = Main;