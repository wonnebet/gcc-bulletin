// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('bulletin')
// );

var CommentBox = React.createClass({displayName: "CommentBox",
    render: function() {
        return (
            React.createElement("div", {className: "commentBox"},
                "Hello, world! I am a CommentBox."
            )
        );
    }
});

React.render(
    React.createElement(),
    document.getElementById('bulletin')
);