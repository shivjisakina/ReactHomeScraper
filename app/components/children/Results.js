const React = require('react');

// Exporting Results
const Results = React.createClass({

    // Saving the article
    clickToSave: function (result) {
        this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
    },

    // Sending props to the component
    componentWillReceiveProps: function (nextProps) {
        const that = this;
        const myResults = nextProps.results.map(function (search, i) {
            const boundClick = that.clickToSave.bind(that, search);
            return <div className="list-group-item" key={i}>
                <a href={search.web_url} target="_blank">{search.headline.main}</a>
                <br />{search.pub_date}<br />
                <button type="button" className="btn btn-primary" style={{'float': 'right', 'marginTop': '-39px'}}
                        onClick={boundClick}>Save
                </button>
            </div>
        });
        this.setState({results: myResults});
    },
    // Rendering HTML
    render: function () {
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title text-center"><strong>Articles</strong></h3>
                </div>
                <div className="panel-body">
                    {/* Map function loops through an array in JSX*/}
                    {this.state.results}
                </div>
            </div>
        )
    }
});

// Module Exports
module.exports = Results;