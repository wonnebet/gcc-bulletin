//https://facebook.github.io/react/docs/tutorial.html

// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('bulletin')
// );
var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";
var dateKey = "date/";
var issueKey = "issue/"
var taglinesKey = "taglines/";

var Header = React.createClass({displayName: "Header",
	getInitialState: function() {
		return {data: []};
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

var Bulletin = React.createClass({displayName: "Bulletin",
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {date: "", issue: "", taglines: []};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase(firebaseRoot + dateKey);
		this.bindAsArray(firebaseRef, "taglines")
	}
});

React.render(
	React.createElement(Bulletin, null),
	document.getElementById('bulletin')
);

// <div class="text-header h1">
//     <div class="row">
//         <div class="col-xs-6 text-left">
//             April 12, 2015
//         </div>
//         <div class="col-xs-6 text-right">
//             Vol. 20, Issue 26
//         </div>
//     </div>
// </div>


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