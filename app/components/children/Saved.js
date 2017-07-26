const React = require('react');

// Exporting Saved
const Saved = React.createClass({

    // Delete the article on click
    clickToDelete: function (result) {
        this.props.deleteArticle(result);

    },

    componentWillReceiveProps: function (nextProps) {
        const that = this;
        console.log(nextProps);
        const myResults = nextProps.savedArticles.map(function (search, i) {
            const boundClick = that.clickToDelete.bind(that, search);
            return <div className="list-group-item" key={i}>
                <a href={search.url} target="_blank">{search.title}</a>
                <br />{search.date}<br />
                <button type="button" className="btn btn-danger" style={{'float': 'right', 'marginTop': '-39px'}}
                        onClick={boundClick}>Delete
                </button>
            </div>
        });
        this.setState({savedArticles: myResults});
    },
    // Rendering HTML
    render: function () {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
                </div>
                <div className="panel-body">
                    {/* Map function loops through an array in JSX*/}
                    {this.state.savedArticles}
                </div>
            </div>
        )
    }
});

// Module Exports
module.exports = Saved;