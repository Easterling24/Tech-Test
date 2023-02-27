class EasyBot {
	constructor() {
		this.checkList = [];
		this.allCells = document.querySelectorAll('.game-cell');
		this.resultContainer = document.getElementById('result');
		this.restartBtn = document.getElementById('restart-btn');
		this.winStatus = false;
		this.currentPlayer = 'CROSS';

		// Resetting game settings when clicking on restart button
		this.restartBtn.addEventListener('click', (e) => {
			this.allCells.forEach((cell) => {
				cell.classList.remove('cross', 'zero', 'blink');
			});

			this.winStatus = false;
			this.checkList.length = 0;
			this.currentPlayer = 'CROSS';
			this.resultContainer.innerText = '';
		});
	}

	areEqual(one, two) {
		if (one === two) return one;
		return false;
	}

	checkEquality(currentPlayer, array) {
		for (const item of array) {
			const a = this.checkList[item[0]];
			const b = this.checkList[item[1]];
			if (this.areEqual(a, b) == currentPlayer) {
				return [ item[0], item[1] ];
			}
		}
		return false;
	}

	blinkTheBox(val) {
		if (val) {
			// if the combination is right, a class is added to each element of the winning items making it blink
			for (const i of val) {
				const box = document.querySelector(`[data-cell="${i}"]`);
				box.classList.add('blink');
			}
			return true;
		}

		return false;
	}

	boxClick(targetCell, player, boxNum) {
		// On click, adding either a "cross" or "zero" class
		this.checkList[boxNum] = player;
		targetCell.classList.add(player.toLowerCase());
	}

	isWin() {
		let val = false;

		if (this.checkList[0] == this.currentPlayer) {
			val = this.checkEquality(this.currentPlayer, [ [ 1, 2 ], [ 3, 6 ], [ 4, 8 ] ]);
			if (val && this.blinkTheBox([ 0, ...val ])) return true;
		}

		if (this.checkList[8] == this.currentPlayer) {
			val = this.checkEquality(this.currentPlayer, [ [ 2, 5 ], [ 6, 7 ] ]);
			if (val && this.blinkTheBox([ 8, ...val ])) return true;
		}

		if (this.checkList[4] == this.currentPlayer) {
			val = this.checkEquality(this.currentPlayer, [ [ 1, 7 ], [ 3, 5 ], [ 2, 6 ] ]);
			if (val && this.blinkTheBox([ 4, ...val ])) return true;
		}

		return val;
	}

	checkWin(len) {
		if (len >= 3 && this.isWin()) {
			this.winStatus = true;

			if (this.currentPlayer === 'CROSS') {
				this.resultContainer.innerText = 'Humain Won';
			} else {
				this.resultContainer.innerText = 'Bot Won';
			}
		} else if (len === 8) {
			this.winStatus = true;
			this.resultContainer.innerText = 'Match is draw';
		}

		return this.winStatus;
	}

	// Handling cell click
	handleCellClick(e) {
		let len = this.checkList.filter(Boolean).length;
		const boxNum = parseInt(e.target.getAttribute('data-cell'));
		let boxNumForBot;

		// Checking if no winner exists atm

		if (!this.winStatus && !this.checkList[boxNum]) {
			this.currentPlayer = 'CROSS';
			this.boxClick(e.target, 'CROSS', boxNum);

			if (this.checkWin(len) === false) {
				len = this.checkList.filter(Boolean).length;
				this.currentPlayer = 'ZERO';
				while (len < 9) {
					boxNumForBot = Math.floor(Math.random() * 9);

					if (!this.checkList[boxNumForBot]) {
						this.boxClick(this.allCells[boxNumForBot], 'ZERO', boxNumForBot);
						this.checkWin(len);
						break;
					}
				}
			}
		}
	}

	run() {
		this.allCells.forEach((cell) => {
			cell.addEventListener('click', (e) => this.handleCellClick(e));
		});
	}
}

let easyBot = new EasyBot().run();
