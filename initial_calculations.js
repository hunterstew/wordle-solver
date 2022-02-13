   let outcomes = 3**5;
	var possibleOutcomes = [];
	let colors = ['g','y','b'];
	for(i=0; i<3; i++) {
		for(j=0; j<3; j++) {
			for(k=0; k<3; k++) {
				for(l=0; l<3; l++) {
					for(m=0;m<3;m++) {
						possibleOutcomes.push([colors[i],colors[j],colors[k],colors[l],colors[m]]);
					}
				}
			}
		}
	}

//ONLY RUN ONCE TO GET INITIAL GUESSES...careful it takes ~15-20mins for allWords, ~3 for solutionWords
	nextGuessesForWords = [];
	counter = 0;
	bestGuesses = [];
	allWords.forEach(word => { //for each word
		nextGuessesForPossibleOutcomes = [];
		expectedValue = [];
		entropy = [];
		possibleOutcomes.forEach(outcome => { //for each outcome
			nextGuesses = solutionWords; //change to allWords for different performance
			for(i=0; i<5; i++) {
				if(outcome[i] == 'g') {
					nextGuesses = nextGuesses.filter(function(guess) {return guess[i] == word[i]})
				}
				else if(outcome[i] == 'y') {
					nextGuesses = nextGuesses.filter(function(guess) {return guess[i]      !== word[i]
																		&&  (guess[(i+1)%5] == word[i]
																		||   guess[(i+2)%5] == word[i]
																	    ||   guess[(i+3)%5] == word[i]
																		||   guess[(i+4)%5] == word[i])})
				}
				else { // == 'b'
					nextGuesses = nextGuesses.filter(function(guess) {return guess[i]       !== word[i]
																		&&   guess[(i+1)%5] !== word[i]
																		&&   guess[(i+2)%5] !== word[i]
																	    &&   guess[(i+3)%5] !== word[i]
																		&&   guess[(i+4)%5] !== word[i]})
				}
			}
			//get p(x) for each outcome
			probability = nextGuesses.length / solutionWords.length; //allWords
			if (probability) {
			// get info for each outcome
			information = Math.log2(1/probability);
			// part of expected value
			ev = probability * information;
			expectedValue.push(ev);
			}
			nextGuessesForPossibleOutcomes.push(nextGuesses); //for specific word, all possible outcomes
		})
		//entropy
		e = expectedValue.reduce(getSum,0);

		function getSum(total, num) {
			return total + num;
		}
		entropy.push(e);
		nextGuessesForWords.push(nextGuessesForPossibleOutcomes); // aggregate above
		counter= counter+1;
		console.log(counter)
		bestGuesses.push({word: word, entropy: e})
	});

	//console.log(nextGuessesForWords)
	var sortedBestGuesses = bestGuesses.slice(0);
	sortedBestGuesses.sort(function(x,y) {
		a = x.entropy;
		b = y.entropy;
		return a < b ? -1 : a > b ? 1 : 0;
	});

	console.log(sortedBestGuesses)

console.log(initialEntropyAllWords);

initialEntropySolutionWords = [];
initialEntropyAllowedWords = [];
initialEntropyAllWords.forEach(word => {
	if(solutionWords.includes(word.word)) {
		initialEntropySolutionWords.push(word);
	}
	else {
		initialEntropyAllowedWords.push(word);
	} // possible
});
console.log(initialEntropySolutionWords);
console.log(initialEntropyAllowedWords);