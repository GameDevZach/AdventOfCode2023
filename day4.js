const MyUtil = require('./MyUtil.js');

console.time("Day 4 Solutions");

let lottoPoints = 0;
let cards = []; // Card : { quantity: number, winningNumbers: number[], rolledNumbers: number[], matches: number }
let totalCardQuantity = 0;

function getNumbersFromString(str){
	return str.split(' ').map((a)=>(+a)).filter((a)=>(a));
}

// Organize ticket data for part 2. Each card gets 1 point for a winner match, then doubles for every extra match.
function partOne(line){
	const lineId = (line.substring(6,8));
	const numberStrings = line.split(":")[1].split("|");
	const winningString = numberStrings[0];
	const rolledString = numberStrings[1];
	
	const winningNumbers = getNumbersFromString(winningString);
	const rolledNumbers = getNumbersFromString(rolledString);
	
	let winnerPoints = 0;
	let matches = 0;
	for(let i = 0; i < rolledNumbers.length; i++){
		if(winningNumbers.some((a)=>(a === rolledNumbers[i]))){
			matches += 1;
			if(winnerPoints){
				winnerPoints *= 2;
			}else{
				winnerPoints = 1;
			}
		}
	}
	
	cards.push({
		quantity: 1,
		winningNumbers: winningNumbers,
		rolledNumbers: rolledNumbers,
		matches: matches,
	});
	
	lottoPoints += winnerPoints;
}

// 
function partTwo(){
	console.time("P2 Time");
	for(let i = 0; i < cards.length; i++){
		//console.log(`Card ${i+1} had ${cards[i].matches}... and there were ${cards[i].quantity} of that card now.`);
		for(let j = 0; j < cards[i].matches; j++){
			cards[i + 1 + j].quantity += cards[i].quantity;
		}
	}
	
	totalCardQuantity = cards.reduce((accumulator, card) => (accumulator + card.quantity), 0); 
	console.timeEnd("P2 Time");
}

async function solver(){
	await MyUtil.ProcessLineByLine("input4.txt", partOne);
	partTwo();
	
	console.log("Day 4 Part 1 Answer: " + lottoPoints);
	console.log("Day 4 Part 2 Answer: " + totalCardQuantity);
	console.timeEnd("Day 4 Solutions");
}

solver();