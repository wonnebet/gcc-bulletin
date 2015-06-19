var Header = React.createClass({
	render: function() {
		return (
			<div className="header h1">
				<TwoColumnRow split={"1:1"} leftText={this.props.date} rightText={this.props.issue} />
			</div>
		);
	}
});

var Itinerary = React.createClass({
	render: function() {
		var itinerary = this.props.items.map(function (item) {
			return (
				<Line type={item.type} text={item.text} />
			);
		});

		return (
			<div className="text-center">
				{itinerary}
			</div>
		);
	}
});

var SermonNotes = React.createClass({
	render: function() {
		var notes = this.props.notes.map(function (item) {
			switch (item.type) {
				case "static":
					return (<StaticNote text={item.text} />);
					break;
				case "input":
					return (<Input />);
					break;
				case "inputArea":
					return (<InputArea />);
					break;
				case "blank":
					return (<Line type={"blank"} />);
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
						<Line type={"text"} text={this.props.header.titlePrimary} />
						<Line type={"text"} text={this.props.header.titleSecondary} />
						<br />
						<Line type={"italic"} text={this.props.header.scripture} />
					</div>
				</div>
				<form className="form-inline text-left">
					{notes}
				</form>
			</div>
		);
	}
});

var FrontPage = React.createClass({
	render: function() {
		return (
			<div>
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
			<div className="container text-body h4">
				<Menu curPage={frontKey} />
				<FrontPage data={this.state.front} />
			</div>
		);
	}
});

React.render(
	<Bulletin />,
	document.getElementById('bulletin')
);