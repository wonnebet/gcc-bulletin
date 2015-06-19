var Header = React.createClass({
	render: function() {
		return (
			<div className="text-center">
				<Line type={"large"} text={this.props.title} />
				<Line type={"italic"} text={this.props.note} />
			</div>
		);
	}
});

var Events = React.createClass({
	render: function() {
		var events = this.props.events.map(function (item) {
			return (
				<li>
					<span className="text-underline">{item.name}</span> - {item.text}
				</li>
			);
		});

		return (
			<div className="text-left">
				<ul>
					{events}
				</ul>
			</div>
		);
	}
});

var Financial = React.createClass({
	render: function() {
		var finances = this.props.data.finances.map(function(item) {
			return (
				<TwoColumnRow split={"2:1"} leftText={item.title} rightText={item.amount} />
			);
		});

		return (
			<div>
				<div className="text-center">
					<Line type={"bold"} text={this.props.data.title} />
				</div>
				{finances}
			</div>
		);
	}
});

var Nursery = React.createClass({
	render: function() {
		var nursery = this.props.data.notes.map(function(item) {
			return (
				<Line type={item.type} text={item.text} />
			);
		});

		return (
			<div>
				<div className="text-center">
					<Line type={"bold"} text={this.props.data.title} />
				</div>
				<div className="text-left">
					{nursery}
				</div>
			</div>
		);
	}
});

var Children = React.createClass({
	render: function() {
		return(
			<div>
			</div>
		);
	}
});

var Wednesday = React.createClass({
	render: function() {
		return(
			<div>
			</div>
		);
	}
});

var LeftPage = React.createClass({
	render: function() {
		return (
			<div>
				<Header title={this.props.data.header.title} note={this.props.data.header.note} />
				<br />
				<Events events={this.props.data.events} />
				<hr />
				<div className="row">
					<div className="col-xs-6">
						<Financial data={this.props.data.financial} />
					</div>
					<div className="col-xs-6 vr-thick">
						<Nursery data={this.props.data.nursery} />
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-xs-6">
						<Children data={this.props.data.children} />
					</div>
					<div className="col-xs-6">
						<Wednesday data={this.props.data.wednesday} />
					</div>
				</div>
			</div>
		);
	}
});

var Bulletin = React.createClass({
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
			<div className="container text-body h4">
				<Menu curPage={leftKey} />
				<LeftPage data={this.state.left} />
			</div>
		);
	}
});

React.render(
	<Bulletin />,
	document.getElementById('bulletin')
);