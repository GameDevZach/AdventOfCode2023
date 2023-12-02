const fs = require('fs');
const readline = require('readline');

console.time("Day 1 Solutions");

let calibrationNumbers = [];
let realCalibrationNumbers = [];

const numberMappings = [
	{ str: "one", num: 1 },
	{ str: "two", num: 2 },
	{ str: "three", num: 3 },
	{ str: "four", num: 4 },
	{ str: "five", num: 5 },
	{ str: "six", num: 6 },
	{ str: "seven", num: 7 },
	{ str: "eight", num: 8 },
	{ str: "nine", num: 9 },
]

function searchForNumber (curStr) {
	for(let i = 0; i < numberMappings.length; i++){
		if(curStr.indexOf(numberMappings[i].str) >= 0){
			return numberMappings[i].num;
		}
	}
	return false;
}

function processLineBasic (line) {
	let numberStr = "";
	for(let i = 0; i < line.length; i++){
		const curCharNum = +line[i];
		if(curCharNum){
			numberStr = line[i];
			break;
		}
	}
	
	for(let i = line.length - 1; i >= 0; i--){
		const curCharNum = +line[i];
		if(curCharNum){
			numberStr += line[i];
			break;
		}
	}
	calibrationNumbers.push(+numberStr);
}

function processLineAdvanced (line) {
	let numberStr = "";
	let curString = "";
	for(let i = 0; i < line.length; i++){
		const curCharNum = +line[i];
		if(curCharNum){
			numberStr = line[i];
			break;
		}
		curString += line[i];
		const wordNumberResult = searchForNumber(curString);
		if(wordNumberResult){
			numberStr = `${wordNumberResult}`;
			break;
		}
	}
	
	curString = "";
	for(let i = line.length - 1; i >= 0; i--){
		const curCharNum = +line[i];
		if(curCharNum){
			numberStr += line[i];
			break;
		}
		curString = line[i] + curString;
		const wordNumberResult = searchForNumber(curString);
		if(wordNumberResult){
			numberStr += `${wordNumberResult}`;
			break;
		}
	}
	realCalibrationNumbers.push(+numberStr);
}

//The answer to this Stack Overflow question was so good that it was added to the official Node docs https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
async function processLineByLine() { 
	const fileStream = fs.createReadStream('inputCalibrationsDay1.txt');
	
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	// crlfDelay option used to recognize cross-platform EOL chars
	
	for await(const line of rl) {
		processLineBasic(line);
		processLineAdvanced(line);
	}
}

async function addThemUp() {
	await processLineByLine();
	
	//console.log(calibrationNumbers);
	
	let totalCalibration = 0;
	let realTotalCalibration = 0;
	for(let i = 0; i < calibrationNumbers.length; i++){
		totalCalibration += calibrationNumbers[i];
		realTotalCalibration += realCalibrationNumbers[i];
	}
	console.log("Answer 1: " + totalCalibration);
	console.log("Answer 2: " + realTotalCalibration);
	console.timeEnd("Day 1 Solutions");
}

addThemUp();