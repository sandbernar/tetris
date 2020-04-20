class Figure {

	constructor () {
		this.x = 2;
		this.y = 0;

		// this.position = {
		// 	x: 2,
		// 	y: 0
		// }

		this.subScene = [];
		this.initEmptyFigure();
		this.initFigure();
	}

	initEmptyFigure () {

		for (var i = 0; i < 4; i++) {
			this.subScene[i] = [];
			for (var j = 0; j < 4; j++) {
				this.subScene[i][j] = '';
			}
		}
	}

	getLowestBlock () {
		let lowest = 0;
		for (var i = 0; i < this.subScene.length; i++) {
			if (this.subScene[i][1] > lowest) {
				lowest = this.subScene[i][1];
			}
		}

		// because 0 is already first block
		return lowest + this.y + 1
	}

	initFigure () {
		let figuresList = this.getFigureTypes();
		let length = Object.keys(figuresList).length;
		let randomIndex = Math.floor(Math.random() * length)
		// console.log(randomIndex)
		this.subScene = figuresList[randomIndex];
	}

	getFigureTypes () {

		return {
			//line
			0: [
				[0,0],
				[0,1],
				[0,2],
				[0,3]
			],
			//cube
			1: [
				[0,0],
				[0,1],
				[1,0],
				[1,1]
			],
			//dot
			2: [
				[0,0]
			],
			//pyramyd
			3: [
				[0,0],
				[0,1],
				[0,2],
				[1,1]
			]
		}

	}
}