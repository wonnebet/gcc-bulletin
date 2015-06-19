var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("div", {className: "header h1"}, 
				React.createElement(TwoColumnRow, {split: "1:1", leftText: this.props.date, rightText: this.props.issue})
			)
		);
	}
});

var Itinerary = React.createClass({displayName: "Itinerary",
	render: function() {
		var itinerary = this.props.items.map(function (item) {
			return (
				React.createElement(Line, {type: item.type, text: item.text})
			);
		});

		return (
			React.createElement("div", {className: "text-center"}, 
				itinerary
			)
		);
	}
});

var SermonNotes = React.createClass({displayName: "SermonNotes",
	render: function() {
		var notes = this.props.notes.map(function (item) {
			switch (item.type) {
				case "static":
					return (React.createElement(StaticNote, {text: item.text}));
					break;
				case "input":
					return (React.createElement(Input, null));
					break;
				case "inputArea":
					return (React.createElement(InputArea, null));
					break;
				case "blank":
					return (React.createElement(Line, {type: "blank"}));
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
						React.createElement(Line, {type: "text", text: this.props.header.titlePrimary}), 
						React.createElement(Line, {type: "text", text: this.props.header.titleSecondary}), 
						React.createElement("br", null), 
						React.createElement(Line, {type: "italic", text: this.props.header.scripture})
					)
				), 
				React.createElement("form", {className: "form-inline text-left"}, 
					notes
				)
			)
		);
	}
});

var FrontPage = React.createClass({displayName: "FrontPage",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("img", {src: "http://placehold.it/600x200", className: "img-responsive center-block"}), 
				React.createElement(Header, {date: this.props.data.header.date, issue: this.props.data.header.issue}), 
				React.createElement(Itinerary, {items: this.props.data.itinerary}), 
				React.createElement("hr", null), 
				React.createElement(SermonNotes, {header: this.props.data.sermon.header, notes: this.props.data.sermon.notes}), 
				React.createElement(Footer, null)
			)
		);
	}
});

var Bulletin = React.createClass({displayName: "Bulletin",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			front: {
				header: {},
				itinerary: [],
				sermon: {
					header: {},
					notes: []
				}
			}
		};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot);
		this.bindAsObject(firebaseRef.child(frontKey), frontKey);
	},

	render: function() {
		return (
			React.createElement("div", {className: "container text-body h4"}, 
				React.createElement(Menu, {curPage: frontKey}), 
				React.createElement(FrontPage, {data: this.state.front})
			)
		);
	}
});

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);