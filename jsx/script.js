//https://facebook.github.io/react/docs/tutorial.html

// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('bulletin')
// );

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});

React.render(
    <CommentBox />,
    document.getElementById('bulletin')
);
