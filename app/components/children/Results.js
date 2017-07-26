const React = require('react');

// Create Results Comp.
const Results = React.createClass({

    getInitialState: function () {
        return {
            title: "",
            date: "",
            url: "",
            results: []
        }
    },
    // Save Article w/ Clicks
    clickToSave: function (result) {
        this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
    },
    // Results Child recieve Props
    componentWillReceiveProps: function (nextProps) {
        const that = this;
        const myResults = nextProps.results.map(function (search, i) {
            const boundClick = that.clickToSave.bind(that, search);
            return <div className="list-group-item" key={i}>
                <a href={search.web_url} target="_blank">{search.headline.main}</a>
                <br />{search.pub_date}<br />
                <button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-39px'}}
                        onClick={boundClick}>Save
                </button>
            </div>
        });
        this.setState({results: myResults});
    },
    // Render HTML
    render: function () {
        return (
            <div className="panel ResultPanel">
                <div className="panel-heading">
                    <h3 className="panel-title text-center bold">Articles</h3>
                </div>
                <div className="panel-body">
                    {this.state.results}
                </div>
            </div>
        )
    }
});

// Export Results
module.exports = Results;