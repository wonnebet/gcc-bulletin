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

var StaticNote = React.createClass({displayName: "StaticNote",
	render: function() {
		return (
			React.createElement("p", {className: "form-control-static"}, 
				this.props.text
			)
		);
	}
});

var Input = React.createClass({displayName: "Input",
	render: function() {
		return(
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "text", className: "form-control"})
			)
		);
	}
});

var InputArea = React.createClass({displayName: "InputArea",
	render: function() {
		return(
			React.createElement("div", {className: "form-group"}, 
				React.createElement("textArea", {className: "form-control", rows: "3", cols: "40"})
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

var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("div", {className: "header h1"}, 
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
		var notes = this.props.notes.map(function (note) {
			switch (note.type) {
				case "static":
					return (React.createElement(StaticNote, {text: note.text}));
					break;
				case "input":
					return (React.createElement(Input, null));
					break;
				case "inputArea":
					return (React.createElement(InputArea, null));
					break;
				case "blank":
					return (React.createElement(BlankLine, null));
					break;
			}
		});

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6 text-left"}, 
						React.createElement("img", {src: "http://placehold.it/150x100", className: "img-responsive", alt: "GCC"})
					), 
					React.createElement("div", {className: "col-xs-6 text-strong text-right"}, 
						React.createElement("div", null, 
							this.props.header.title
						), 
						React.createElement("div", {className: "text-em"}, 
							this.props.header.scripture
						)
					)
				), 
				React.createElement("form", {className: "form-inline text-left"}, 
					notes
				)
			)
		);
	}
});

var Footer = React.createClass({displayName: "Footer",
	render: function() {
		return (
			React.createElement("div", {className: "header"}
			)
		);
	}
});

var FrontPage = React.createClass({displayName: "FrontPage",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			header: {},
			itinerary: [],
			sermon: {
				header: {},
				notes: []
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
				React.createElement(SermonNotes, {header: this.state.sermon.header, notes: this.state.sermon.notes}), 
				React.createElement(Footer, null)
			)
		);
	}
});

var Bulletin = React.createClass({displayName: "Bulletin",
	render: function() {
		
	}
})

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);