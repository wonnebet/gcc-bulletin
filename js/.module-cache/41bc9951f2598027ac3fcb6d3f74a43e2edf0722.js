var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var pageFrontKey = "front/";

var firebaseFront = firebaseRoot + pageFrontKey;

var headerKey = "header/";
var itineraryKey = "itinerary/";
var sermonKey = "sermon/";

var LeftRightRow = React.createClass({displayName: "LeftRightRow",
	render: function() {
		React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-xs-6 text-left"}, 
				this.props.left
			), 
			React.createElement("div", {className: "col-xs-6 text-right"}, 
				this.props.right
			)
		)
}
})
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

var BlankLine = React.createClass({displayName: "BlankLine",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("br", null)
			)
		);
	}
});

var Bulletin = React.createClass({displayName: "Bulletin",
	render: function() {
		return (
			React.createElement("div", {className: "container text-center text-body h4"}, 
				React.createElement("img", {src: "http://placehold.it/600x200", className: "img-responsive center-block"}), 
					React.createElement(Header, null), 
				React.createElement(Itinerary, null), 
				React.createElement("hr", null), 
				React.createElement(Sermon, null)
			)
		);
	}
});

var Header = React.createClass({displayName: "Header",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {header: {}};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseFront + headerKey);
		this.bindAsObject(firebaseRef, "header");
	},

	render: function() {
		return (
			React.createElement(LeftRightRow, {left: this.state.header.date, right: this.state.header.issue})
		);
	}
});

var Itinerary = React.createClass({displayName: "Itinerary",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {itinerary: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseFront + itineraryKey);
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
				case "blank":
					return (React.createElement(BlankLine, null));
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

var Sermon = React.createClass({displayName: "Sermon",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {sermon: {}};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseFront + sermonKey);
		this.bindAsObject(firebaseRef, "sermon");
	},

	render: function() {
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-xs-6 text-left"}
				), 
				React.createElement("div", {className: "col-xs-6 text-strong text-right"}
				)
			)
		);
	}
})

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);