var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var pageFrontKey = "front/";

var firebaseFront = firebaseRoot + pageFrontKey;

var headerKey = "header";
var itineraryKey = "itinerary";
var sermonKey = "sermon";

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
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			header: {},
			itinerary: [],
			sermon: {
				header: {},
				notes: {}
			}
		};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseFront);
		this.bindAsObject(firebaseRef.child(headerKey), headerKey);
		this.bindAsArray(firebaseRef.child(itineraryKey), itineraryKey);
		this.bindAsObject(firebaseRef.child(sermonKey), sermonKey);
	},

	render: function() {
		return (
			React.createElement("div", {className: "container text-center text-body h4"}, 
				React.createElement("img", {src: "http://placehold.it/600x200", className: "img-responsive center-block"}), 
				React.createElement(Header, {date: this.state.header.date, issue: this.state.header.issue}), 
				React.createElement(Itinerary, {items: this.state.itinerary}), 
				React.createElement("hr", null), 
				React.createElement(SermonNotes, {title: this.state.sermon.header.title, scripture: this.state.sermon.header.scripture}), 
				React.createElement(Footer, null)
			)
		);
	}
});

var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("div", {className: "text-header h1"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6 text-left"}, 
						this.props.date
					), 
					React.createElement("div", {className: "col-xs-6 text-right"}, 
						this.props.issue
					)
				)
			)
		);
	}
});

var Itinerary = React.createClass({displayName: "Itinerary",
	render: function() {
		var itinerary = this.props.items.map(function (item) {
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

var SermonNotes = React.createClass({displayName: "SermonNotes",
	render: function() {
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-xs-6 text-left"}, 
					React.createElement("img", {src: "http://placehold.it/150x100", className: "img-responsive", alt: "GCC"})
				), 
				React.createElement("div", {className: "col-xs-6 text-strong text-right"}, 
					React.createElement("div", null, 
						this.props.title
					), 
					React.createElement("div", {className: "text-em"}, 
						this.props.scripture
					)
				)
			)
		);
	}
});

var Footer = React.createClass({displayName: "Footer",
	render: function() {
		
	}
})

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);