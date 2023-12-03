const MyUtil = require('./MyUtil.js');

console.time("Day 3 Solutions");

var schematic = [];
var gridWidth;
var gridHeight;

// Test a cell for a symbol. All we know for certain is that a symbol is not a period or number, and it's within the bounds of the grid
function testCell(x,y) {
	if(x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return false;
	const cellChar = schematic[y][x];
	
	if(cellChar == '.')return false;
	if(Number.isInteger(+cellChar))return false;
	
	return true; // it's not a number or ., so it's got to be a symbol
}

// Find and sum all numbers in the schematic with an adjacent "symbol" (including diagonal)
function processSchematic () {
	let answer = 0;
	let prevAnswer = 0;
	
	// Iterate lines of schematic (i is y target)
	for(let i = 0; i < gridHeight; i++){
		let buildingNumber = 0;
		let foundSymbol = false;
		// Iterate characters of line (j is x target)
		for(let j = 0; j < gridWidth; j++){
			const curNum = +(schematic[i][j]);
			
			if(Number.isInteger(curNum)){ // on a number
				if(buildingNumber){
					buildingNumber = buildingNumber * 10 + curNum; // continuing number, scootch that digit 
					if(foundSymbol || testCell(j,i-1) || testCell(j,i+1)) foundSymbol = true; // check above and below for a symbol
				}else{ 
					buildingNumber = curNum; // beginning new number 
					if(testCell(j-1,i-1) || testCell(j-1,i) || testCell(j-1,i+1) || testCell(j,i-1) || testCell(j,i+1)) foundSymbol = true; // check this cell and above/below for symbol, check the 3 cells prior to this as well
				}
			}else{ // NaN
				if(buildingNumber){
					if(foundSymbol || testCell(j,i-1) || testCell(j,i) || testCell(j,i+1)) foundSymbol = true; // check this cell and above/below for symbol
					if(foundSymbol) answer += buildingNumber; // save number if symbol was found
					buildingNumber = 0;
					foundSymbol = false;
				}else{
					// Not currently using a number, skip
				}
			}
		}
		if(foundSymbol) answer += buildingNumber; // save number if symbol was found and reached the end of the line
	}
	
	return answer;
}

// search left and right of a digit to form a full number
function getFullNumberAt (x,y) {
	if(x < 0 || y < 0 || x >= gridWidth || y >= gridHeight)return NaN;
	let leftBound = x;
	let rightBound = x;
	let currentNumber = +schematic[y][x];
	if(Number.isNaN(currentNumber))return currentNumber;
	// try to stretch left bound 
	while(leftBound > 0 && !Number.isNaN(+schematic[y][leftBound-1])){
		leftBound -= 1;
	}
	currentNumber = +schematic[y][x];
	// try to stretch right bound
	while(rightBound < gridWidth - 1 && !Number.isNaN(+schematic[y][rightBound + 1])){
		rightBound += 1;
	}
	return(parseInt(schematic[y].substr(leftBound, rightBound + 1)));
}

// Solve part 2 by looking for '*' gears with exactly 2 numbers adjacent to them and summing the "gear powers" i.e. those 2 numbers multiplied on valid gears
function findGearRatios () {
	let totalGearPowers = 0;
	
	for(let y = 0; y < gridHeight; y++) {
		for(let x = 0; x < gridWidth; x++) {
			// check if it is a gear
			if(schematic[y][x] == '*'){
				//console.log(`Gear at ${x} , ${y}`);
				let surroundingNumbers = [];
				// And now we madly check for numbers around it and push them to an array
				const topNumber = getFullNumberAt(x,y - 1);
				//console.log(`topNumber ${topNumber}`);
				if(!topNumber){
					const leftTopNumber = getFullNumberAt(x - 1, y - 1);
					//console.log(`topLeftNumber ${leftTopNumber}`);
					if(leftTopNumber)surroundingNumbers.push(leftTopNumber);
					const rightTopNumber = getFullNumberAt(x + 1, y - 1);
					//console.log(`rightTopNumber ${rightTopNumber}`);
					if(rightTopNumber)surroundingNumbers.push(rightTopNumber);
				}else{
					surroundingNumbers.push(topNumber);
				}
				const leftNumber = getFullNumberAt(x - 1,y);
				//console.log(`leftNumber ${leftNumber}`);
				if(leftNumber)surroundingNumbers.push(leftNumber);
				const rightNumber = getFullNumberAt(x + 1,y);
				//console.log(`rightNumber ${rightNumber}`);
				if(rightNumber)surroundingNumbers.push(rightNumber);
				const bottomNumber = getFullNumberAt(x,y + 1);
				//console.log(`bottom number ${bottomNumber}`);
				if(!bottomNumber){
					const leftBottomNumber = getFullNumberAt(x - 1, y + 1);
					//console.log(`leftBottomNumber ${leftBottomNumber}`);
					if(leftBottomNumber)surroundingNumbers.push(leftBottomNumber);
					const rightBottomNumber = getFullNumberAt(x + 1, y + 1);
					//console.log(`rightBottomNumber ${rightBottomNumber}`);
					if(rightBottomNumber)surroundingNumbers.push(rightBottomNumber);
				}else{
					surroundingNumbers.push(bottomNumber);
				}
				
				if(surroundingNumbers.length == 2){
					//console.log("success, add m'up");
					totalGearPowers += surroundingNumbers[0] * surroundingNumbers[1];
				}else{
					//console.log("skipping this gear! Bad!");
					//console.log(`incorrect powers, reading: `,surroundingNumbers);
				}
			}
		}
	}
	
	return totalGearPowers;
}

async function solver() {
	await MyUtil.ProcessLineByLine("input3.txt", (line)=>schematic.push(line));
	
	gridWidth = schematic[0].length;
	gridHeight = schematic.length;
	
	const answer1 = processSchematic();
	const answer2 = findGearRatios();

	console.log("Day 3 Answer 1: " + answer1);
	console.log("Day 3 Answer 2: " + answer2);
	console.timeEnd("Day 3 Solutions");
}

solver();
