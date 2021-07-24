let player = Math.round() > 0.5 ? 'X' : '0';
let gameState = true;

let GameController = (function () {
	return {
		changeTurn: (currentPlayer) => {
			// Change player's turn
			player = currentPlayer === 'X' ? '0' : 'X';
		}
	}
})();


let UIController = (function () {

	const DOMStrings = {
		oneNum: 'one',
		twoNum: 'two',
		threeNum: 'three',
		fourNum: 'four',
		fiveNum: 'five',
		sixNum: 'six',
		sevenNum: 'seven',
		eightNum: 'eight',
		nineNum: 'nine',
		message: 'message',
		squareClass: '.col-xs-4',
		blink: 'blink',
		startGameBtn: 'start'
	}

	let getMark = (DOMId) => {
		// Get 'X' or '0' of square id
		return document.getElementById(DOMId).innerText
	}

	let makeWinnigSquareUI = (sq) => {
		// Make winning position square text green
		document.getElementById(sq).style.color = 'green';
	}

	return {
		DOMStrings: DOMStrings,
		addMark: (DOMId, mark) => {
			// Add 'X' or '0' to Square id 
			document.getElementById(DOMId).innerText = mark;
		},
		getMark: getMark,
		removeMark: (num) => {
			// Remove marks from given id of square
			document.getElementById(num).innerText = '';
		},
		removeMarkAndColor: (sq) => {
			// Remove marks and change text color to black of given id of square
			document.getElementById(sq).style.color = 'black';
			document.getElementById(sq).innerText = '';
		},
		isEmptyPos: (num) => {
			// Check square is empty or not
			if (document.getElementById(num).innerText) return false;
			return true;
		},
		setMessage: (msg) => {
			// Set messages to UI
			let DOMEle = document.getElementById(DOMStrings.message);
			DOMEle.innerText = msg;
			DOMEle.style.color = 'black';
			DOMEle.classList.remove(DOMStrings.blink)
		},
		setAlertMessage: (msg) => {
			// Set alert messages to UI
			let DOMEle = document.getElementById(DOMStrings.message);
			DOMEle.innerText = msg;
			DOMEle.style.color = 'red';
			DOMEle.classList.add(DOMStrings.blink)
		},
		setNotificationMessage: (msg) => {
			// Set notification message to UI
			let DOMEle = document.getElementById(DOMStrings.message);
			DOMEle.innerText = msg;
			DOMEle.style.color = 'blue';
			DOMEle.classList.add(DOMStrings.blink)
		},
		checkWinningSquares: (sq1, sq2, sq3, player) => {
			// Check for winning squares return true if winner else false
			if (getMark(sq1) === player && getMark(sq2) === player && getMark(sq3) === player) {
				makeWinnigSquareUI(sq1);
				makeWinnigSquareUI(sq2);
				makeWinnigSquareUI(sq3);
				return true;
			}
			return false;
		}
	}

})();


let Controller = (function (GameCntl, UICntl) {

	let clearFields = function () {
		// Clear all squares's text
		UICntl.removeMarkAndColor(UICntl.DOMStrings.oneNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.twoNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.threeNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.fourNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.fiveNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.sixNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.sevenNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.eightNum);
		UICntl.removeMarkAndColor(UICntl.DOMStrings.nineNum);
		UICntl.setMessage(`${player}'s turn. Good Luck...`);
		gameState = true;
	}

	let marksForWinning = (player) => {
		// Check all square for winning position
		if (UICntl.checkWinningSquares(UICntl.DOMStrings.oneNum, UICntl.DOMStrings.twoNum, UICntl.DOMStrings.threeNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.fourNum, UICntl.DOMStrings.fiveNum, UICntl.DOMStrings.sixNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.sevenNum, UICntl.DOMStrings.eightNum, UICntl.DOMStrings.nineNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.oneNum, UICntl.DOMStrings.fiveNum, UICntl.DOMStrings.nineNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.threeNum, UICntl.DOMStrings.fiveNum, UICntl.DOMStrings.sevenNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.oneNum, UICntl.DOMStrings.fourNum, UICntl.DOMStrings.sevenNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.twoNum, UICntl.DOMStrings.fiveNum, UICntl.DOMStrings.eightNum, player) ||
			UICntl.checkWinningSquares(UICntl.DOMStrings.threeNum, UICntl.DOMStrings.sixNum, UICntl.DOMStrings.nineNum, player)
		) return true;

		return false;
	}


	let notDrawMatch = function () {
		// Check all squares are filled or not false if all are not filled else true
		if (UICntl.getMark(UICntl.DOMStrings.oneNum) !== '' && UICntl.getMark(UICntl.DOMStrings.twoNum) !== '' && UICntl.getMark(UICntl.DOMStrings.threeNum) !== '' &&
			UICntl.getMark(UICntl.DOMStrings.fourNum) !== '' && UICntl.getMark(UICntl.DOMStrings.fiveNum) !== '' && UICntl.getMark(UICntl.DOMStrings.sixNum) !== '' &&
			UICntl.getMark(UICntl.DOMStrings.sevenNum) !== '' && UICntl.getMark(UICntl.DOMStrings.eightNum) !== '' && UICntl.getMark(UICntl.DOMStrings.nineNum) !== '')
			return false;
		return true;
	}

	// Add event listener to start over button 
	document.getElementById(UICntl.DOMStrings.startGameBtn).addEventListener('click', clearFields);

	// Set event listeners to game
	let setEventListners = function () {
		let allSquares = document.querySelectorAll(UICntl.DOMStrings.squareClass);
		for (let i = 0; i < allSquares.length; i++) {
			allSquares[i].addEventListener("click", function (event) {
				console.log("All events are registered...");
				if (gameState) {
					// If game is state is true
					if (UICntl.isEmptyPos(event.target.id)) {
						// If square is empty add mark 
						UICntl.addMark(event.target.id, player);
						if (marksForWinning(player)) {
							// If player wins set notification and change state
							UICntl.setNotificationMessage(`${player} win the game...`);
							gameState = false;
						} else if (notDrawMatch()) {
							// If match is not (All squares are not filled) change player's turn
							GameCntl.changeTurn(player);
							UICntl.setMessage(`${player}'s turn...`);
						} else {
							// Set draw match notification
							UICntl.setAlertMessage('This match is draw. Please start again!')
						}
					} else {
						// Set already filled position message
						UICntl.setAlertMessage('This position is alredy filled.')
					}
				}
			})
		}
	}


	return {
		init: () => {
			// Start function 
			UICntl.removeMark(UICntl.DOMStrings.oneNum);
			UICntl.removeMark(UICntl.DOMStrings.twoNum);
			UICntl.removeMark(UICntl.DOMStrings.threeNum);
			UICntl.removeMark(UICntl.DOMStrings.fourNum);
			UICntl.removeMark(UICntl.DOMStrings.fiveNum);
			UICntl.removeMark(UICntl.DOMStrings.sixNum);
			UICntl.removeMark(UICntl.DOMStrings.sevenNum);
			UICntl.removeMark(UICntl.DOMStrings.eightNum);
			UICntl.removeMark(UICntl.DOMStrings.nineNum);
			UICntl.setMessage(`${player}'s turn. Good Luck...`);
			setEventListners();
			gameState = true;
		}
	}

})(GameController, UIController);

// Start function called when page loads
Controller.init();