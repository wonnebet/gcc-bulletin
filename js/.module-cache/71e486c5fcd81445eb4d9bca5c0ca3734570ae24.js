//https://facebook.github.io/react/docs/tutorial.html

// React.render(
//	<h1>Hello, world!</h1>,
// 	document.getElementById('bulletin')
// );
var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var dateKey = "date/";
var issueKey = "issue/"
var taglinesKey = "taglines/";

var Bulletin = React.createClass({displayName: "Bulletin",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {date: "", issue: "", taglines: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + dateKey);
		this.bindAsObject(firebaseRef, "date");

		firebaseRef = new Firebase(firebaseRoot + issueKey)
		this.bindAsObject(firebaseRef, "issue");

		firebaseRef = new Firebase(firebaseRoot + taglinesKey);
		this.bindAsArray(firebaseRef, "taglines")
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Header, {date:  this.state.date, issue:  this.state.issue}), 
				React.createElement(Itinerary, {taglines:  this.state.taglines})
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
		
	},
	
	render: function() {
		return (
			React.createElement("div", {className: "text-header h1"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-xs-6 text-left"}, 
						"this.state.data.date"
					), 
					React.createElement("div", {className: "col-xs-6 text-right"}, 
						"this.state.data.issue"
					)
				)
			)
		);
	}
})

var Itinerary = React.createClass({displayName: "Itinerary",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {tagllines: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + taglinesKey);
		this.bindAsArray(firebaseRef, "taglines");
	},

	render: function() {
		var taglines = this.state.taglines.map(function (tagline) {
			return (
				React.createElement("div", {className: "text-em"}, 
					tagline
				)
			);
		});

		return (
			React.createElement("div", null, 
				taglines
			)
		)
	}
})

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);


var data = [
	{author: "Pete Hunt", text: "This is one comment"},
	{author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({displayName: "Comment",
	render: function() {
		return (
			React.createElement("div", {className: "comment"}, 
				React.createElement("h2", {className: "commentAuthor"}, 
					this.props.author
				), 
				this.props.children
			)
		);
	}
});

var CommentList = React.createClass({displayName: "CommentList",
	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				React.createElement(Comment, {author: comment.author}, 
					comment.text
				)
			);
		});
		return (
			React.createElement("div", {className: "commentList"}, 
				commentNodes
			)
		);
	}
});

var CommentForm = React.createClass({displayName: "CommentForm",
	render: function() {
		return (
			React.createElement("div", {className: "commentForm"}, 
				"Hello, world! I am a CommentForm."
			)
		);
	}
});

var CommentBox = React.createClass({displayName: "CommentBox",
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				React.createElement("h1", null, "Comments"), 
				React.createElement(CommentList, {data: this.props.data}), 
				React.createElement(CommentForm, null)
			)
		);
	}
});

// React.render(
// 	<CommentBox data={data} />,
// 	document.getElementById('bulletin')
// );
