// scene size 8x32
// block is 10x10 px

// fill empty scene




// render scene


class Game {

	constructor () {
		this.scene = [];
		this.sceneObject = document.getElementById('scene');
		this.activeFigure = null;
		this.size = {
			x: 8,
			y: 32
		}

		this.interval = null;


		this.initEmptyScene();
		this.addFigure(new Figure);

	}

	initEmptyScene () {

		for (var i = 0; i < this.size.y; i++) {
			this.scene[i] = [];
			for (var j = 0; j < this.size.x; j++) {
				this.scene[i][j] = '';
			}
		}
	}

	addFigure (figure) {
		this.activeFigure = figure;

		this.drawFigure('red')
	}

	drawFigure (boxClass) {

		let fx = this.activeFigure.x;
		let fy = this.activeFigure.y;
		for (var i = 0; i < this.activeFigure.subScene.length; i++) {
			let coord = this.activeFigure.subScene[i];
			let x = fx + coord[0];
			let y = fy + coord[1];

			// console.log('drawing', boxClass)
			if (boxClass == 'red' && this.scene[y][x] != '') {
				// console.log('game over!')
				// console.log(this.scene[y][x])
				clearInterval(this.interval);
			}

			this.scene[y][x] = boxClass;
		}
	}

	ifFreePosition(x,y) {
		let figure = this.activeFigure;
		let fx = x;
		let fy = y;
		for (var i = 0; i < figure.subScene.length; i++) {
			let coord = figure.subScene[i];
			let x = fx + coord[0];
			let y = fy + coord[1];

			if (typeof this.scene[y] == 'undefined' ||
				typeof this.scene[y][x] == 'undefined') {
				console.log('wall!');
				return false;
			}

			if (this.scene[y][x] == 'green') {
				console.log('already green element!');
				return false;
			}
		}
		return true;
	}

	// isLowerSpaceEmpty() {
	// 	let figure = this.activeFigure;

	// 	let fx = figure.x;
	// 	let fy = figure.y + 1;
	// 	for (var i = 0; i < figure.subScene.length; i++) {
	// 		let coord = figure.subScene[i];
	// 		let x = fx + coord[0];
	// 		let y = fy + coord[1];

	// 		if (this.scene[y][x] == 'green') {
	// 			console.log('lower not empty')
	// 			return false;
	// 		}
	// 	}

	// 	console.log('lower is empty')
	// 	return true;
	// }

	run () {
		var game = this;

		this.interval = setInterval(function() {
			game.update()
		}, 100, game)

	}

	update () {

		if (this.ifFigureFinished()) {
			
			this.stopFigure();

			this.tryToDestroyRow();
			this.addFigure(new Figure);

		} else {

			this.moveFigureDown();

		}

		this.render();
	}

	tryToDestroyRow () {
		// look for full row
		// go throw all rows
		for (var i = 0; i < this.scene.length; i++) {
			let sceneRow = this.scene[i];


			let isRowFull = true;

			for (var j = 0; j < sceneRow.length; j++) {
				let blockClass = sceneRow[j];
				if (blockClass != 'green') {
					isRowFull = false;
					break;
				}
			}


			if (isRowFull) {
				// clear row
				for (var j = 0; j < this.size.x; j++) {
					this.scene[i][j] = '';
				}

				// go up to all 
				// move all green block down to 1
				for (var i2 = i; i2 > 0; i2--) {
					this.scene[i2] = this.scene[i2-1]
				}
				console.log('1 down')

			}

		}
	}

	ifFigureFinished () {
		// if we are on the bottom
		if (this.activeFigure.y >= this.size.y) {
			return true;
		}
		if (this.activeFigure.getLowestBlock() >= this.size.y) {
			return true;
		}

		// if we are on another figure
		let newX = this.activeFigure.x;
		let newY = this.activeFigure.y +1;
		if (!this.ifFreePosition(newX, newY)) {
		// if (!this.isLowerSpaceEmpty()) {
			return true;
		}


		return false

	}

	moveFigureDown () {
		// clear previous position colors
		this.drawFigure('');
		this.activeFigure.y++;
		this.drawFigure('red');
	}

	moveFigureLeft () {

		// check wall
		if (this.activeFigure.x == 0) {
			return false;
		}

		// check left side
		let x = this.activeFigure.x - 1;
		let y = this.activeFigure.y;
		if (!this.ifFreePosition(x,y)) {
			return false
		}

		// clear previous position colors
		this.drawFigure('');
		this.activeFigure.x--;
		this.drawFigure('red');
	}

	moveFigureRight () {

		// check left side
		let x = this.activeFigure.x + 1;
		let y = this.activeFigure.y;
		if (!this.ifFreePosition(x,y)) {
			return false
		}

		// clear previous position colors
		this.drawFigure('');
		this.activeFigure.x++;
		this.drawFigure('red');
	}

	stopFigure () {
		// clear previous position colors
		this.drawFigure('green');
	}

	render () {
		// clear scene
		this.sceneObject.innerHTML = '';

		for (var i = 0; i < this.scene.length; i++) {
			// console.log('draw row')
			let sceneRow = this.scene[i];

			for (var j = 0; j < sceneRow.length; j++) {
				let blockClass = sceneRow[j];
				let gridElement = document.createElement('div');
				gridElement.classList.add('block-one');

				if (blockClass) {
					gridElement.classList.add(blockClass);
				}

				this.sceneObject.append(gridElement);
			}
		}
	}
}
