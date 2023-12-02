const MyUtil = require('./MyUtil.js');

console.time("Day 2 Solutions");

const limits = {
	red: 12,
	green: 13,
	blue: 14
}

let validGames = [];
let gameIdSum = 0;
let totalPowers = 0;

function useLine(line){
	const firstSplit = line.split(":");
	const gameStr = firstSplit[0];
	const gameNum = +(gameStr.split(' ')[1]);
	const sets = firstSplit[1].split(";");
	let minCubes = {
		red: 0,
		green: 0,
		blue: 0
	}
	let gamePossible = true;
	for(let i=0; i<sets.length; i++){
		const splitSet = sets[i].split(',');
		for(let j=0; j<splitSet.length; j++) {
			const cubeData = splitSet[j].split(' ');
			minCubes[cubeData[2]] = Math.max(minCubes[cubeData[2]],cubeData[1]);
			if(limits[cubeData[2]] < cubeData[1]){
				gamePossible = false;
			}
		}
	}
	const power = minCubes.red * minCubes.green * minCubes.blue;
	totalPowers += power;
	if(gamePossible){
		validGames.push(gameNum);
		gameIdSum += gameNum;
	}
}

async function solver() {
	await MyUtil.ProcessLineByLine("input2.txt", useLine);
	console.log("Day 2 Part 1: " + gameIdSum);
	console.log("Day 2 Part 2: " + totalPowers);
	console.timeEnd("Day 2 Solutions");
}

solver();
