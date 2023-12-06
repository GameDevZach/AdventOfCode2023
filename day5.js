const MyUtil = require('./MyUtil.js');

let seeds;
let realSeeds;

// transformation set is { label: string, transformations: transformation[] } 
// a transformation is { destination: number, source: number, range: number } 
let transformationSets = [];  
let currentSetRef;


console.time("Day 5 Solutions");

// organize transformation sets from the data
function processData(line) {
	if(line.trim() === '')return; // skip blank lines
	if(!seeds){
		// get the seeds		
		const seedStrings = line.split(':')[1].split(' ');
		seeds = [];
		realSeeds = [];
		for(let i = 1; i < seedStrings.length; i++){
			const possibleSeed = +seedStrings[i];
			if(Number.isInteger(possibleSeed)){
				seeds.push(possibleSeed);
				console.log(realSeeds);
				if(i%2){ // is index odd?
					realSeeds.push(possibleSeed);
				}else{
					let iterator = realSeeds[realSeeds.length - 1] + 1;
					for(let j = 0; j < possibleSeed; j++){
						realSeeds.push(iterator + j);
					}
				}
			}
		}
	}else{
		// Do we have numbers, or is this the start of a new transformation type map
		if(Number.isInteger(+line[0])){
			const row = line.split(' ');
			currentSetRef.transformations.push({
				destination: +row[0],
				source: +row[1],
				range: +row[2]
			});
		}else{
			currentSetRef = { label: line.split(":")[0], transformations: [] };
			transformationSets.push(currentSetRef);
		}
	}
}

function partOne(line){
	// process seeds
	let locationMinimum = 999999999;
	for(let seedIndex = 0; seedIndex < seeds.length; seedIndex++){
		for(let setIndex = 0; setIndex < transformationSets.length; setIndex++){
			const transformer = transformationSets[setIndex].transformations.find(({destination, source, range}) =>(seeds[seedIndex] >= source && seeds[seedIndex] < source + range));
			if(!transformer){
				// this seed stays the same for a step
			}else{
				seeds[seedIndex] = seeds[seedIndex] - transformer.source + transformer.destination;
			}
		}
		if(seeds[seedIndex] < locationMinimum)locationMinimum = seeds[seedIndex];
	}
	console.log("Day 5 Part 1 Answer: " + locationMinimum);
}

// 
function partTwo(){
	// process REAL seeds
	let locationMinimum = 999999999;
	for(let seedIndex = 0; seedIndex < realSeeds.length; seedIndex++){
		for(let setIndex = 0; setIndex < transformationSets.length; setIndex++){
			const transformer = transformationSets[setIndex].transformations.find(({destination, source, range}) =>(realSeeds[seedIndex] >= source && realSeeds[seedIndex] < source + range));
			if(!transformer){
				// this seed stays the same for a step
			}else{
				realSeeds[seedIndex] = realSeeds[seedIndex] - transformer.source + transformer.destination;
			}
		}
		if(realSeeds[seedIndex] < locationMinimum)locationMinimum = realSeeds[seedIndex];
	}
	console.log("Day 5 Part 2 Answer: " + locationMinimum);
}

async function solver(){
	await MyUtil.ProcessLineByLine("example5.txt", processData);
	partOne();
	partTwo();
	
	console.log("Day 5 Part 2 Answer: ");
	console.timeEnd("Day 5 Solutions");
}

solver();