//jsx --extension jsx --watch jsx/ js/

var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";

var frontKey = "front";
var leftKey = "left";
var rightKey = "right";
var backKey = "back";

var Line = React.createClass({
	render: function() {
		if (this.props.type === "blank") {
			return (
				<div>
					<br />
				</div>
			);
		} else {
			var classString = "";

			if (this.props.type.indexOf("bold") > -1) {
				classString += " text-strong";
			}

			if (this.props.type.indexOf("italic") > -1) {
				classString += " text-em";
			}

			if (this.props.type.indexOf("large") > -1) {
				classString += " h1";
			}

			if (this.props.type.indexOf("left") > -1) {
				classString += " text-left";
			}

			if (this.props.type.indexOf("right") > -1) {
				classString += " text-right";
			}

			return (
				<div className={classString}>
					{this.props.text}
				</div>
			);
		}
	}
});

var TwoColumnRow = React.createClass({
	render: function() {
		var row = function(split, leftText, rightText) {
			var ratios = split.split(":").map( function( num ){ return parseInt( num, 10 ) } );
			var ratioTotal = ratios[0] + ratios[1];
			var multiplier = 12 / ratioTotal;
			ratios = ratios.map( function(x){return (x * multiplier)});

			var leftClass = "text-left col-xs-" + ratios[0];
			var rightClass = "text-right col-xs-" + ratios[1];

			return (
				<div className="row">
					<div className={leftClass}>
						{leftText}
					</div>
					<div className={rightClass}>
						{rightText}
					</div>
				</div>
			);
		};

		return (
			<div>
				{row(this.props.split, this.props.leftText, this.props.rightText)}
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

var Footer = React.createClass({
	render: function() {
		return (
			<div className="header">
			</div>
		);
	}
});

var Menu = React.createClass({
	render: function() {
		return (
			<ul className="nav nav-pills">
				<li role={"presentation"} className={this.props.curPage === frontKey ? "active" : ""}><a href={frontKey + ".html"}>Front Cover</a></li>
				<li role={"presentation"} className={this.props.curPage === leftKey ? "active" : ""}><a href={leftKey + ".html"}>Left Inner</a></li>
				<li role={"presentation"}c lassName={this.props.curPage === rightKey ? "active" : ""}><a href={rightKey + ".html"}>Right Inner</a></li>
				<li role={"presentation"} className={this.props.curPage === backKey ? "active" : ""}><a href={backKey + ".html"}>Back Cover</a></li>
			</ul>
		);
	}
});