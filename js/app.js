
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$("a.new").click(newGame);
  	$("#guessButton").click(makeGuess);

  	newGame();

});

var numberToGuess = 0;
var guessCount = 0;

function newGame() {
	// compute new random number between 1 and 100
	numberToGuess = Math.floor(Math.random() * 100 + 1);
	console.log("Secret number is " + numberToGuess);
	// clear guess count and display it
	setGuessCount(0);
	// clear guess list
	$("#guessList").html("");
}

function makeGuess() {
	console.log("Make guess!");
	// get and validate userGuess -- if no good, display error and bail out
	var raw = $("#userGuess").val() ;
	var guess = validateGuess(raw);
	if (guess) {
		// get and display feedback 
		$("#feedback").html(getFeedback(guess));
		// increment and display guess count
		setGuessCount(guessCount + 1);
		// add to guess list
		$("#guessList").append("<li>" + guess + "</li>");
	} else {
		alert("Guess " + raw + " is not a valid guess\n"
			   + "Your guess must be a whole number between 1 and 100" +
			   ", inclusive.");
	}
	// reset to empty to let the placeholder value come up
	$("#userGuess").val("");
}

function setGuessCount(count) {
	guessCount = count;
	$("#count").html(guessCount);
}

function validateGuess(raw) {
	/* if the raw input is a valid guess
	   (whole number in the range 1 to 100, inclusive)
	   return that number; 
	   else return NaN
	*/
	var n = parseInt(raw, 10);
  	if (n >= 1 && n <= 100 & raw % 1 == 0) {
    	return n;
  	} else {
    	return NaN;
  	}
}

function getFeedback(guess) {
	var feedback = "";
	var diff = Math.abs(guess - numberToGuess);
	/* if a user is 50 or further away from the secret number, 
	   they are told they are “Ice cold”, 
	   if they are between 30 and 50 they are “cold”, 
	   if they are between 20 and 30 they are warm, 
	   between 10 and 20 hot, 
	   and between 1 and 10 “very hot”. */
	if (diff == 0) {
		feedback = "YOU GUESSED IT!";
	} else if (diff <= 10) {
		feedback = "Very Hot";
	} else if (diff <= 20) {
		feedback = "Hot";
	} else if (diff <= 30) {
		feedback = "Warm";
	} else if (diff <= 50) {
		feedback = "Cold";
	} else {
		feedback = "Ice cold";
	}

	return feedback;
}


