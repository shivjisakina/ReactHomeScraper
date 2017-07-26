const React = require('react');

// Create Form Comp.
const Form = React.createClass({

	// The main state
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: ""
		}
	},
 	// Handle Pre Search Change
	handleChange: function(event){
    	// Pre Search 
    	const newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},
	// Handle Search Term
	handleClick: function(){
		// Parent Search Term
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
	},
	// Render HTML
	render: function(){
		return(
			<div className="panel panel-info">
				<div className="panel-heading">
					<h2 className="panel-title text-center bold">Search For Articles</h2>
				</div>
				<div className="panel-body text-center">
						<form>
							<div className="form-group">
								<h4 className="bold">Article</h4>
								<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>Start Year</strong></h4>
								<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>End Year</strong></h4>
								<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
								<br />
								<button type="button" className="btn btn-success" onClick={this.handleClick}>Search</button>
							</div>
						</form>
				</div>
			</div>
		)
	}
});

// Export Form
module.exports = Form;