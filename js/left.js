var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("div", {className: "text-center"}, 
				React.createElement(Line, {type: "large", text: this.props.title}), 
				React.createElement(Line, {type: "italic", text: this.props.note})
			)
		);
	}
});

var Events = React.createClass({displayName: "Events",
	render: function() {
		var events = this.props.events.map(function (item) {
			return (
				React.createElement("li", null, 
					React.createElement("span", {className: "text-underline"}, item.name), " - ", item.text
				)
			);
		});

		return (
			React.createElement("div", {className: "text-left"}, 
				React.createElement("ul", null, 
					events
				)
			)
		);
	}
});

var Financial = React.createClass({displayName: "Financial",
	render: function() {
		var finances = this.props.data.finances.map(function(item) {
			return (
				React.createElement(TwoColumnRow, {split: "2:1", leftText: item.title, rightText: item.amount})
			);
		});

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "text-center"}, 
					React.createElement(Line, {type: "bold", text: this.props.data.title})
				), 
				finances
			)
		);
	}
});

var Nursery = React.createClass({displayName: "Nursery",
	render: function() {
		var nursery = this.props.data.notes.map(function(item) {
			return (
				React.createElement(Line, {type: item.type, text: item.text})
			);
		});

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "text-center"}, 
					React.createElement(Line, {type: "bold", text: this.props.data.title})
				), 
				React.createElement("div", {className: "text-left"}, 
					nursery
				)
			)
		);
	}
});

var Children = React.createClass({displayName: "Children",
	render: function() {
		return(
			React.createElement("div", null
			)
		);
	}
});

var Wednesday = React.createClass({displayName: "Wednesday",
	render: function() {
		return(
			React.createElement("div", null
			)
		);
	}
});

var LeftPage = React.createClass({displayName: "LeftPage",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Header, {title: this.props.data.header.title, note: this.props.data.header.note}), 
				React.createElement("br", null), 
				React.createElement(Events, {events: this.props.data.events}), 
				React.createElement("hr", null), 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6"}, 
						React.createElement(Financial, {data: this.props.data.financial})
					), 
					React.createElement("div", {className: "col-xs-6 vr-thick"}, 
						React.createElement(Nursery, {data: this.props.data.nursery})
					)
				), 
				React.createElement("hr", null), 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6"}, 
						React.createElement(Children, {data: this.props.data.children})
					), 
					React.createElement("div", {className: "col-xs-6"}, 
						React.createElement(Wednesday, {data: this.props.data.wednesday})
					)
				)
			)
		);
	}
});

var Bulletin = React.createClass({displayName: "Bulletin",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			left: {
				header: {},
				events: [],
				financial: {
					finances: []
				},
				nursery: {
					notes: []
				},
				children: {
					assignments: []
				},
				wednesday: {
					assignments: []
				}
			}
		};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot);
		this.bindAsObject(firebaseRef.child(leftKey), leftKey);
	},

	render: function() {
		return (
			React.createElement("div", {className: "container text-body h4"}, 
				React.createElement(Menu, {curPage: leftKey}), 
				React.createElement(LeftPage, {data: this.state.left})
			)
		);
	}
});

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);