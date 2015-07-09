function controller() {
	switch(arguments[0]) {
		case "circle":
		case "c":
			arguments.callee[arguments[0]].x = arguments[1];
			arguments.callee[arguments[0]].y = arguments[2];
			break;
		case "d":
			switch(arguments[1]) {
				case "up":
				case "down":
				case "left":
				case "right":
					arguments.callee.d[arguments[1]] = !!arguments[2];
					break;
				case default:
					throw new Error("controller(), case \"d\", received \""+arguments[1]+"\" as second argument");
					break;
			};
			break;
		case "button":
			switch(arguments[1]) {
				case "a":
				case "x":
				case "y":
				case "r":
				case "zl":
				case "zr":
					arguments.callee.button[arguments[1]] = !!arguments[2];
					window.dispatchEvent(new CustomEvent("controller", {type: "button", button: arguments[1], state: arguments.callee.button[arguments[1]]}));
					break;
				case "b":
				case "l":
					arguments.callee.button.b = !!arguments[2];
					break;
					window.dispatchEvent(new CustomEvent("controller", {type: "button", button: arguments[1], state: arguments.callee.button.b}));
			};
			break;
		case default:
			throw new Error("Unsupported controller \""+arguments[0]+"\"!");
			break;
	};
};
controller.circle = {
	x: 0,
	y: 0
};
controller.c = {
	x: 0,
	y: 0
};
controller.d = {
	up: false,
	down: false,
	left: false,
	right: false
};
window.document.onkeydown = function(e) {
	switch(e.keycode) {
		case 37:
		case 38:
		case 39:
		case 40:
			controller("d", ["left", "up", "right", "down"][e.keycode - 37], true);
			break;
		case default:
			/*Key handling not to do with console-connect goes here*/
			break;
	};
};
hashReady = false
window.document.onhashchange = function(e) {
	if(hashReady) {
		switch(window.location.hash) {
			case "#back":
				controller("button", "b", true);
				window.history.forward();
				controller("button", "b", false);
				break;
			case "#forward":
				controller("button", "r", true);
				window.history.back();
				controller("button", "r", false);
				break;
			case "#enter":
				controlller("button", "a", true);
				window.history.back();
				hashReady = false;
				controlller("button", "a", false);
				break;
			case default:
				hashReady = false;
				break;
		};
	} else {
		switch(window.location.hash) {
			case "":
				window.location.hash = "#back";
				break;
			case "#back":
				window.location.hash = "#normal";
				break;
			case "#normal":
				window.location.hash = "#forward";
				hashReady = true;
				break;
			case default:
				window.location.hash = "";
				break;
		};
	};
};
window.onscroll = function(e){
	control("circle", window.scrollx - 1000, window.scrolly - 1000);
	window.scrollTo(1000, 1000);
};
