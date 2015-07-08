function controller() {
	switch(arguments[0]) {
		case "circle":
		case "c":
			arguments.callee[arguments[0]].x = arguments[1];
			arguments.callee[arguments[0]].y = arguments[2];
			break;
		case "d":
			switch (arguments[1]) {
				case "up":
				case "down":
				case "left":
				case "right":
					arguments.callee.d[arguments[1]] = !!arguments[2]
					break;
				case default:
					throw new Error("controller(), case \"d\", received \""+arguments[1]+"\" as second argument");
					break;
			};
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
	switch (e.keycode) {
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
