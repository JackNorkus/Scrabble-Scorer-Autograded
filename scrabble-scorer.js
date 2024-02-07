// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble! Enter a word: ");
   return userWord;
};

let simpleScorer = function(word) {
   let simpleScore = word.length;
   return simpleScore;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelBonusScore = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U') {
         vowelBonusScore += 3;
      } else {
         vowelBonusScore += 1;
      }
   }
   return vowelBonusScore;
};

function transform(oldPointStructureObj) {
   let newPointStructureObj = {};
   let letterKey = '';
   let lowerLetterKey = '';

   for (num in oldPointStructureObj) {
      for (let i = 0; i < oldPointStructureObj[num].length; i++) { // Tried using for (letter in oldPointsStructureObj), but this didn't work.
         letterKey = oldPointStructureObj[num][i];
         lowerLetterKey = letterKey.toLowerCase();
         newPointStructureObj[lowerLetterKey] = Number(num);
      }
   }
   return newPointStructureObj;
}

let newPointStructure = transform(oldPointStructure);

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let scrabbleScore = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i] in newPointStructure) {
         scrabbleScore += newPointStructure[word[i]]; //Tried scrabbleScore += newPointsStructure[i], but this didn't work.
      }
   }
   return scrabbleScore;
};

let oldScrabbleScorerObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

let simpleScorerObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScorerObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, oldScrabbleScorerObject];

function scorerPrompt() {
   console.log(`0 is the ${scoringAlgorithms[0].name} scorer. ${scoringAlgorithms[0].description}`);
   console.log(`1 is the ${scoringAlgorithms[1].name} scorer. ${scoringAlgorithms[1].description}`);
   console.log(`2 is the ${scoringAlgorithms[2].name} scorer. ${scoringAlgorithms[2].description}`);
   let selectedNumber = input.question("Which scorer would you like to use? ");
   let selectedObject = scoringAlgorithms[selectedNumber];
   return selectedObject;
}

function runProgram() {
   let word = initialPrompt();
   let functionObject = scorerPrompt();
   let outputScore = functionObject.scorerFunction(word);
   console.log(outputScore);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
