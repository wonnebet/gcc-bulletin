//jsx --extension jsx --watch jsx/ js/

var firebaseRoot = "https://crackling-torch-3976.firebaseio.com/gcc/";

var frontKey = "front";
var leftKey = "left";
var rightKey = "right";
var backKey = "back";

var Line = React.createClass({displayName: "Line",
	render: function() {
		if (this.props.type === "blank") {
			return (
				React.createElement("div", null, 
					React.createElement("br", null)
				)
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
				React.createElement("div", {className: classString}, 
					this.props.text
				)
			);
		}
	}
});

var TwoColumnRow = React.createClass({displayName: "TwoColumnRow",
	render: function() {
		var row = function(split, leftText, rightText) {
			var ratios = split.split(":").map( function( num ){ return parseInt( num, 10 ) } );
			var ratioTotal = ratios[0] + ratios[1];
			var multiplier = 12 / ratioTotal;
			ratios = ratios.map( function(x){return (x * multiplier)});

			var leftClass = "text-left col-xs-" + ratios[0];
			var rightClass = "text-right col-xs-" + ratios[1];

			return (
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: leftClass}, 
						leftText
					), 
					React.createElement("div", {className: rightClass}, 
						rightText
					)
				)
			);
		};

		return (
			React.createElement("div", null, 
				row(this.props.split, this.props.leftText, this.props.rightText)
			)
		);
	}
});

var StaticNote = React.createClass({displayName: "StaticNote",
	render: function() {
		return (
			React.createElement("p", {className: "form-control-static"}, 
				this.props.text
			)
		);
	}
});

var Input = React.createClass({displayName: "Input",
	render: function() {
		return(
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "text", className: "form-control"})
			)
		);
	}
});

var InputArea = React.createClass({displayName: "InputArea",
	render: function() {
		return(
			React.createElement("div", {className: "form-group"}, 
				React.createElement("textArea", {className: "form-control", rows: "3", cols: "40"})
			)
		);
	}
});

var Footer = React.createClass({displayName: "Footer",
	render: function() {
		return (
			React.createElement("div", {className: "header"}
			)
		);
	}
});

var Menu = React.createClass({displayName: "Menu",
	render: function() {
		return (
			React.createElement("ul", {className: "nav nav-pills"}, 
				React.createElement("li", {role: "presentation", className: this.props.curPage === frontKey ? "active" : ""}, React.createElement("a", {href: frontKey + ".html"}, "Front Cover")), 
				React.createElement("li", {role: "presentation", className: this.props.curPage === leftKey ? "active" : ""}, React.createElement("a", {href: leftKey + ".html"}, "Left Inner")), 
				React.createElement("li", {role: "presentation", className: this.props.curPage === rightKey ? "active" : ""}, React.createElement("a", {href: rightKey + ".html"}, "Right Inner")), 
				React.createElement("li", {role: "presentation", className: this.props.curPage === backKey ? "active" : ""}, React.createElement("a", {href: backKey + ".html"}, "Back Cover"))
			)
		);
	}
});