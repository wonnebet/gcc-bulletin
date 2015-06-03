var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var dateKey = "date/";
var issueKey = "issue/";
var flavorLinesKey = "flavorLines/";

var Bulletin = React.createClass({displayName: "Bulletin",
	render: function() {
		return (
			React.createElement("div", {className: "container text-center text-body h4"}, 
				React.createElement("img", {src: "http://placehold.it/600x200", className: "img-responsive center-block"}), 

				React.createElement(Header, null), 
				React.createElement(Itinerary, null)
			)
		);
	}
});

var Header = React.createClass({displayName: "Header",
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
			React.createElement("div", {className: "text-header h1"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6 text-left"}, 
						this.state.date
					), 
					React.createElement("div", {className: "col-xs-6 text-right"}, 
						this.state.issue
					)
				)
			)
		);
	}
});

var FlavorLine = React.createClass({displayName: "FlavorLine",
	render: function() {
		return (
			React.createElement("div", {className: "text-em"}, 
				this.prop.text
			)
		);
	}
});

var MainAction = React.createClass({displayName: "MainAction",
	render: function() {
		return (
			React.createElement("div", {className: "text-strong"}, 
				this.props.text
			)
		);
	}
});

var SecondaryAction = React.createClass({displayName: "SecondaryAction",
	render: function() {
		return (
			React.createElement("div", null, 
				this.props.text
			)
		);
	}
});

var Itinerary = React.createClass({displayName: "Itinerary",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {scripture: ""};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + flavorLinesKey);
		this.bindAsArray(firebaseRef, "flavorLines");
	},

	render: function() {
		var flavorLines = this.state.flavorLines.map(function (flavorLine) {
			return (
				React.createElement("div", {className: "text-em"}, 
					tagline
				)
			);
		});

		return (
			React.createElement("div", null, 
				React.createElement(FlavorLines, null), 
				React.createElement(MainAction, {text: "Welcome and Call to Worship"})
			)
		);
	}
});

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);