const React = require('react');

// Exporting saved to main
const Saved = React.createClass({

    getInitialState: function () {
        return {
            savedArticles: []
        }
    },

    // Delete article on click
    clickToDelete: function (result) {
        this.props.deleteArticle(result);

    },

    // sending props to saved child
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
    // Rendering the html
    render: function () {
        return (
            <div className="panel SavedPanel">
                <div className="panel-heading">
                    <h3 className="panel-title text-center bold">Saved Articles</h3>
                </div>
                <div className="panel-body">
                    {this.state.savedArticles}
                </div>
            </div>
        )
    }
});

// Module exports
module.exports = Saved;