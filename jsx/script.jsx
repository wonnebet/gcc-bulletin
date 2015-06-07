//jsx --extension jsx --watch jsx/ js/

var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";

var frontKey = "front";

var MainAction = React.createClass({
	render: function() {
		return (
			<div className="text-strong">
				{this.props.text}
			</div>
		);
	}
});

var SecondaryAction = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.text}
			</div>
		);
	}
});

var FlavorLine = React.createClass({
	render: function() {
		return (
			<div className="text-em">
				{this.props.text}
			</div>
		);
	}
});

var StaticNote = React.createClass({
	render: function() {
		return (
			<p className="form-control-static">
				{this.props.text}
			</p>
		);
	}
});

var Input = React.createClass({
	render: function() {
		return(
			<div className="form-group">
				<input type={"text"} className="form-control" />
			</div>
		);
	}
});

var InputArea = React.createClass({
	render: function() {
		return(
			<div className="form-group">
				<textArea className="form-control" rows={"3"} cols={"40"} />
			</div>
		);
	}
});

var BlankLine = React.createClass({
	render: function() {
		return (
			<div>
				<br />
			</div>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<div className="header h1">
				<div className="row">
					<div className="col-xs-6 text-left">
						{this.props.date}
					</div>
					<div className="col-xs-6 text-right">
						{this.props.issue}
					</div>
				</div>
			</div>
		);
	}
});

var Itinerary = React.createClass({
	render: function() {
		var itinerary = this.props.items.map(function (item) {
			switch (item.type) {
				case "main":
					return (<MainAction text={item.text} />);
					break;
				case "secondary":
					return (<SecondaryAction text={item.text} />);
					break;
				case "flavor":
					return (<FlavorLine text={item.text} />);
					break;
				case "blank":
					return (<BlankLine />);
					break;
			}
		});

		return (
			<div>
				{itinerary}
			</div>
		);
	}
});

var SermonNotes = React.createClass({
	render: function() {
		var notes = this.props.notes.map(function (note) {
			switch (note.type) {
				case "static":
					return (<StaticNote text={note.text} />);
					break;
				case "input":
					return (<Input />);
					break;
				case "inputArea":
					return (<InputArea />);
					break;
				case "blank":
					return (<BlankLine />);
					break;
			}
		});

		return (
			<div>
				<div className="row">
					<div className="col-xs-6 text-left">
						<img src={"http://placehold.it/150x100"} className="img-responsive" alt="GCC" />
					</div>
					<div className="col-xs-6 text-strong text-right">
						<div>
							{this.props.header.titleMain}
						</div>
						<div>
							{this.props.header.titleSecondary}
						</div>
						<BlankLine />
						<div className="text-em">
							{this.props.header.scripture}
						</div>
					</div>
				</div>
				<form className="form-inline text-left">
					{notes}
				</form>
			</div>
		);
	}
});

var Footer = React.createClass({
	render: function() {
		return (
			<div className="header">
			</div>
		);
	}
});

var FrontPage = React.createClass({
	render: function() {
		return (
			<div className="container text-center text-body h4">
				<img src={"http://placehold.it/600x200"} className="img-responsive center-block" />
				<Header date={this.props.data.header.date} issue={this.props.data.header.issue} />
				<Itinerary items={this.props.data.itinerary} />
				<hr />
				<SermonNotes header={this.props.data.sermon.header} notes={this.props.data.sermon.notes} />
				<Footer />
			</div>
		);
	}
});

var Bulletin = React.createClass({
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
			<FrontPage data={this.state.front} />
		)
	}
})

React.render(
	<Bulletin />,
	document.getElementById('bulletin')
);