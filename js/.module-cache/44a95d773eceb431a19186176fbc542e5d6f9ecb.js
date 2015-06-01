//https://facebook.github.io/react/docs/tutorial.html

// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('bulletin')
// );

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
		return (
			React.createElement("div", {className: "commentList"}, 
				"Hello, world! I am a CommentList"
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
						React.createElement(CommentList, null), 
						React.createElement(CommentForm, null)
			)
		);
	}
});

React.render(
	React.createElement(CommentBox, null),
	document.getElementById('bulletin')
);