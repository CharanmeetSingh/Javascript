/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

More rules added
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var score, roundScore, activePlayer, gamePlaying, prevDice1, prevDice2;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (document.querySelector('.final-score').value === '') {
		alert('Please enter the final score first!');
		return false;
	}
	if (gamePlaying) {
		dice1 = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;
		console.log(dice1);
		console.log(dice2);
		//console.log(dice);
		diceDome1 = document.getElementById('dice-1');
		diceDome2 = document.getElementById('dice-2');
		diceDome1.style.display = 'block';
		diceDome2.style.display = 'block';
		diceDome1.src = 'dice-' + dice1 + '.png';
		diceDome2.src = 'dice-' + dice2 + '.png';
		if (dice1 !== 1 && dice2 !== 1) {
			if ((prevDice1 === 6 || prevDice2 === 6) && (dice1 === 6 || dice2 === 6)) {
				score[activePlayer] = 0;
				document.getElementById('score-' + activePlayer).textContent = '0';
				//nextPlayer
				nextPlayer();
			}else {
				totalOfDice = dice1 + dice2;
				roundScore += totalOfDice;
				document.getElementById('current-' + activePlayer).textContent = roundScore;
				prevDice1 = dice1;
				prevDice2 = dice2;
			}
		}else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//Add it to the overall score
		score[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
		var limitScore = document.querySelector('.final-score').value;
		if (score[activePlayer] >= limitScore) {
			//Winner
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-0-panel').classList.remove('active');
			document.querySelector('.player-1-panel').classList.remove('active');	
			gamePlaying = false;
		}else {
			//nextPlayer
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	prevDice1 = 0;
	prevDice2 = 0;
	gamePlaying = true;
	score = [0,0];
	roundScore = 0;
	activePlayer = 0;
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
}

function nextPlayer() {
	//next player turn
	if (gamePlaying) {
		prevDice1 = 0;
		prevDice2 = 0;
		document.getElementById('current-' + activePlayer).textContent = '0';
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
	}
}