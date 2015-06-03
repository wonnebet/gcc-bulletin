var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var dateKey = "date/";
var issueKey = "issue/";
var itineraryKey = "itinerary/";

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

var FlavorLine = React.createClass({displayName: "FlavorLine",
	render: function() {
		return (
			React.createElement("div", {className: "text-em"}, 
				this.props.text
			)
		);
	}
});

var BlankLine = R

var Itinerary = React.createClass({displayName: "Itinerary",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {itinerary: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + itineraryKey);
		this.bindAsArray(firebaseRef, "itinerary");
	},

	render: function() {
		var itinerary = this.state.itinerary.map(function (item) {
			switch (item.type) {
				case "main":
					return (React.createElement(MainAction, {text: item.text}));
					break;
				case "secondary":
					return (React.createElement(SecondaryAction, {text: item.text}));
					break;
				case "flavor":
					return (React.createElement(FlavorLine, {text: item.text}));
					break;
			}
		});

		return (
			React.createElement("div", null, 
				itinerary
			)
		);
	}
});

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);