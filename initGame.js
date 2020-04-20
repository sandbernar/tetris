
var game = new Game;

game.render();
game.run();

document.addEventListener('keypress', function(event) {
	let key = event.keyCode;

	// move left
	if (key == 97) {
		game.moveFigureLeft();
	} else if (key == 100) {
		game.moveFigureRight();
	}
})