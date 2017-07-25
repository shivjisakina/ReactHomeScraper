// Include React
var React = require("react");

var Search = React.createClass({

    // Here we render the component
    render: function() {

        return (
            <div className="container">
                <div className="row">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Search</h3>
                        </div>
                    </div>

                    <br />

                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Title</span>
                        <input type="text" className="form-control" placeholder="Title" aria-describedby="basic-addon1" />
                    </div>

                    <br />

                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Start Year</span>
                        <input type="text" className="form-control" placeholder="Start Year" aria-describedby="basic-addon1" />
                    </div>

                    <br />

                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">End Year</span>
                        <input type="text" className="form-control" placeholder="End Year" aria-describedby="basic-addon1" />
                    </div>

                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Search;
