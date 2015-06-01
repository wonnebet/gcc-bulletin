var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var dateKey = "date/";
var issueKey = "issue/";
var taglinesKey = "taglines/";

var Bulletin = React.createClass({
	render: function() {
		return (
			<div className="container text-center text-body h4">
				<Header />
				<Itinerary />
			</div>
		);
	}
});

var Header = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {date: "", issue: ""};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + dateKey);
		this.bindAsObject(firebaseRef, "date");

		firebaseRef = new Firebase(firebaseRoot + issueKey);
		this.bindAsObject(firebaseRef, "issue");
	},

	render: function() {
		return (
			<div className="text-header h1">
				<div className="row">
					<div className="col-xs-6 text-left">
						{this.state.date}
					</div>
					<div className="col-xs-6 text-right">
						{this.state.issue}
					</div>
				</div>
			</div>
		);
	}
});

var Itinerary = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {taglines: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + taglinesKey);
		this.bindAsArray(firebaseRef, "taglines");
	},

	render: function() {
		var taglines = this.state.taglines.map(function (tagline) {
			return (
				<div className="text-em">
					{tagline}
				</div>
			);
		});

		return (
			<div>
				{taglines}
			</div>
		);
	}
});

React.render(
	<Bulletin />,
	document.getElementById('bulletin')
);